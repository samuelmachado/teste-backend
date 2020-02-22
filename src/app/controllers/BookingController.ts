import Joi from '@hapi/joi';
import { Booking } from '@models/Booking';
import { Car } from '@models/Car';
import {
  addDays,
  isBefore,
  startOfDay,
  subDays,
  format,
  isAfter,
} from 'date-fns';
import { Request, Response } from 'express';
import { getManager, MoreThan, LessThan } from 'typeorm';

class BookingController {
  public async index(req: Request, res: Response): Promise<Response> {
    const {
      page = 1,
      per_page = 5,
      car_id = undefined,
      branch_id = undefined,
      future = false,
    } = req.query;

    const bookings = await getManager()
      .getRepository(Booking)
      .createQueryBuilder('booking')
      .orderBy('booking.start_date', 'ASC')
      .andWhere(car_id ? 'booking.car_id = :car_id' : '1=1', { car_id })
      .andWhere(future ? 'booking.start_date > :date' : '1=1', {
        date: new Date().toISOString(),
      })
      .leftJoinAndSelect('booking.car', 'car')
      .andWhere(branch_id ? 'car.branch_id = :branch_id' : '1=1', { branch_id })
      .leftJoinAndSelect('car.model', 'model')
      .leftJoinAndSelect('car.branch', 'branch')
      .leftJoinAndSelect('model.manufacturer', 'manufacturer')
      .skip((page - 1) * per_page)
      .take(per_page)
      .getManyAndCount();

    return res
      .set({ num_pages: Math.ceil(bookings[1] / per_page) })
      .json(bookings[0]);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Joi.object({
      threeDaysInterval: Joi.date()
        .default((context: { start_date: Date }) =>
          addDays(new Date(context.start_date), 3),
        )
        .forbidden(),
      start_date: Joi.date()
        .min(new Date())
        .required(),
      end_date: Joi.date()
        .min(Joi.ref('start_date'))
        .max(Joi.ref('threeDaysInterval'))
        .required(),
      car_id: Joi.number()
        .integer()
        .required(),
    });

    try {
      await schema.validateAsync(req.body);
    } catch (err) {
      return res.status(400).json({ err });
    }

    const { start_date, end_date, car_id } = req.body;

    const booked_status = await getManager()
      .getRepository(Booking)
      .findOne({
        where: [
          {
            car_id,
            start_date: LessThan(start_date),
            end_date: MoreThan(start_date),
          },
          {
            car_id,
            start_date: LessThan(end_date),
            end_date: MoreThan(end_date),
          },
        ],
      });

    if (booked_status) {
      return res
        .status(401)
        .json({ err: 'The selected interval is already booked for this car' });
    }

    const booking = await getManager()
      .getRepository(Booking)
      .insert({
        start_date,
        end_date,
        car_id,
      });

    return res.json({ booking });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const booking = await getManager()
      .getRepository(Booking)
      .createQueryBuilder('booking')
      .where('booking.id = :id', { id })
      .leftJoinAndSelect('booking.car', 'car')
      .leftJoinAndSelect('car.model', 'model')
      .leftJoinAndSelect('car.branch', 'branch')
      .leftJoinAndSelect('model.manufacturer', 'manufacturer')
      .getOne();

    return res.json({ booking });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const schema = Joi.object({
      threeDaysInterval: Joi.date()
        .default((context: { start_date: Date }) =>
          addDays(new Date(context.start_date), 3),
        )
        .forbidden(),
      start_date: Joi.date()
        .min(new Date())
        .optional(),
      end_date: Joi.when('start_date', {
        is: Joi.exist(),
        then: Joi.date()
          .min(Joi.ref('start_date'))
          .max(Joi.ref('threeDaysInterval')),
        otherwise: Joi.date().min(new Date()),
      }).optional(),
      car_id: Joi.number()
        .integer()
        .optional(),
      checkin_at: Joi.date()
        .min(new Date())
        .optional(),
      checkout_at: Joi.date()
        .min(new Date())
        .optional(),
    });

    try {
      await schema.validateAsync(req.body, { stripUnknown: true });
    } catch (err) {
      return res.status(400).json({ err });
    }

    const old_booking = await getManager()
      .getRepository(Booking)
      .findOne(id);

    if (!old_booking) {
      return res.status(401).json({ err: 'Booking not found' });
    }

    const { car_id, start_date, end_date } = req.body;

    if (start_date) {
      const car_booking = await getManager()
        .getRepository(Booking)
        .findOne({
          where: [
            {
              car_id: car_id || old_booking.car_id,
              start_date: LessThan(start_date),
              end_date: MoreThan(start_date),
            },
          ],
        });

      if (car_booking && car_booking.id !== old_booking.id) {
        return res
          .status(401)
          .json({ err: 'The car selected is already booked for this period' });
      }
    }

    if (end_date) {
      const car_booking = await getManager()
        .getRepository(Booking)
        .findOne({
          where: [
            {
              car_id: car_id || old_booking.car_id,
              start_date: LessThan(end_date),
              end_date: MoreThan(end_date),
            },
          ],
        });

      if (car_booking && car_booking.id !== old_booking.id) {
        return res
          .status(401)
          .json({ err: 'The car selected is already booked for this period' });
      }
    }

    if (
      start_date &&
      !end_date &&
      isBefore(new Date(start_date), subDays(new Date(old_booking.end_date), 3))
    ) {
      return res.status(401).json({
        err: `You cant change your start_date to be before ${format(
          subDays(new Date(old_booking.end_date), 3),
          'dd-mm-yyyy hh:mm:ss',
        )}`,
      });
    }

    if (
      end_date &&
      !start_date &&
      isAfter(new Date(end_date), addDays(new Date(old_booking.start_date), 3))
    ) {
      return res.status(401).json({
        err: `You cant change your end_date to be after ${format(
          addDays(new Date(old_booking.start_date), 3),
          'dd-MMM-yyyy hh:mm:ss',
        )}`,
      });
    }

    const { checkin_at, checkout_at } = req.body;

    if (
      checkin_at &&
      isBefore(new Date(checkin_at), new Date(old_booking.start_date))
    ) {
      return res
        .status(401)
        .json({ err: `You cant checkin until ${old_booking.start_date}` });
    }

    if (
      checkout_at &&
      isBefore(
        new Date(checkout_at),
        startOfDay(new Date(old_booking.end_date)),
      )
    ) {
      return res
        .status(401)
        .json({ err: `You cant checkout until ${old_booking.end_date}` });
    }

    const booking = await getManager()
      .getRepository(Booking)
      .update(id, req.body);

    return res.json({ booking });
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await getManager()
      .createQueryBuilder()
      .delete()
      .from(Booking)
      .where('id = :id', { id })
      .execute();

    return res.json({ message: 'Booking deleted successfully' });
  }
}

export default new BookingController();
