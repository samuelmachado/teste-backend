import { Car } from '@models/Car';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import Joi = require('@hapi/joi');

class CarController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page = 1, per_page = 5, branch_id = undefined } = req.query;

    const cars = await getManager()
      .getRepository(Car)
      .createQueryBuilder('car')
      .andWhere(branch_id ? 'car.branch_id = :branch_id' : '1=1', {
        branch_id,
      })
      .leftJoinAndSelect('car.model', 'model')
      .leftJoinAndSelect('car.branch', 'branch')
      .leftJoinAndSelect('model.manufacturer', 'manufacturer')
      .orderBy('model.name', 'ASC')
      .skip((page - 1) * per_page)
      .take(per_page)
      .getManyAndCount();

    return res.set({ num_pages: Math.ceil(cars[1] / per_page) }).json(cars[0]);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Joi.object({
      license_plate: Joi.string()
        .alphanum()
        .length(7)
        .required(),
      color: Joi.string().required(),
      model_id: Joi.number()
        .integer()
        .required(),
      branch_id: Joi.number()
        .integer()
        .required(),
    });

    try {
      await schema.validateAsync(req.body, { stripUnknown: true });
    } catch (err) {
      return res.status(400).json({ err });
    }

    const { license_plate } = req.body;

    const exists = await getManager()
      .getRepository(Car)
      .findOne({ license_plate });

    if (exists) {
      return res.status(401).json({
        err: `The car with the plate ${license_plate} already exists`,
      });
    }

    const car = await getManager()
      .getRepository(Car)
      .insert(req.body);

    return res.json({ car });
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const car = await getManager()
      .getRepository(Car)
      .createQueryBuilder('car')
      .where('car.id = :id', { id })
      .leftJoinAndSelect('car.model', 'model')
      .leftJoinAndSelect('car.branch', 'branch')
      .leftJoinAndSelect('model.manufacturer', 'manufacturer')
      .getOne();

    return res.json({ car });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const schema = Joi.object({
      license_plate: Joi.string()
        .alphanum()
        .length(7),
      color: Joi.string(),
      branch_id: Joi.number().integer(),
      model_id: Joi.forbidden(),
    });

    try {
      await schema.validateAsync(req.body, { stripUnknown: true });
    } catch (err) {
      return res.status(400).json({ err });
    }

    const old_car = await getManager()
      .getRepository(Car)
      .findOne(id);

    if (!old_car) {
      return res.status(401).json({ err: 'Car not found' });
    }

    const car = await getManager()
      .getRepository(Car)
      .update(id, req.body);

    return res.json({ car });
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await getManager()
      .createQueryBuilder()
      .delete()
      .from(Car)
      .where('id = :id', { id })
      .execute();

    return res.json({ message: 'Car deleted successfully' });
  }
}

export default new CarController();
