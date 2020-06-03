import { Service } from 'typedi'
import { FindOneOptions, createQueryBuilder, getRepository, Brackets } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { Reservation, Car, CarModel, Factory } from '@/database/models'
import { mountDynamicWhereQueryBuilder } from '@/utils/QueryBuilder'

import { ReservationRepository } from '~/repositories'

@Service()
export default class ReservationService {
  constructor(@OrmRepository() private repository: ReservationRepository) {}

  public async find(options?: FindOneOptions<Reservation>): Promise<Reservation[]> {
    return this.repository.find(options)
  }

  public async findOne(options?: FindOneOptions<Reservation>): Promise<Reservation | undefined> {
    return this.repository.findOne(options)
  }

  public async save(reservation: Reservation): Promise<Reservation | undefined> {
    return this.repository.save(reservation)
  }

  public async update(conditions: Reservation, data: Reservation) {
    return this.repository.update(conditions, data)
  }

  public async validate(reservation: Reservation) {
    const startDate = Date.parse(reservation.startDate)
    const endDate = Date.parse(reservation.endDate)
    const startDateCopy = new Date(startDate)
    startDateCopy.setHours(0, 0, 0, 0)

    if (startDate < Date.now()) throw Error('The reservation date must be in future day')
    if (endDate < startDate) throw Error('The end date must be greater than the start date')
    if (startDateCopy.getTime() + (3 - 1) * 24 * 60 * 60 * 1000 < endDate) throw Error('The reservation can have a maximum of 3 days')

    const hasInInterval = await this.validateInterval(
      (reservation.car.id || (reservation.car as unknown)) as number,
      reservation.startDate,
      reservation.endDate
    )

    if (hasInInterval) throw Error('There are reservations on this date')

    return true
  }

  public async validateInterval(carId: number, start: string, end: string) {
    const queryBuilder = createQueryBuilder(Reservation, 'res')
      .where('car_id = :carId', { carId })
      .andWhere(
        new Brackets((sub) => {
          sub.andWhere(
            ':start BETWEEN start_date AND end_date OR :end BETWEEN start_date AND end_date',
            {
              start,
              end
            }
          )
          sub.orWhere(':start <= start_date AND :end >= end_date', { start, end })
        })
      )

    return (await queryBuilder.getCount()) !== 0
  }

  public async checkIn(reservationId: number) {
    const now = new Date(Date.now()).toISOString()
    const result = await createQueryBuilder(Reservation, 'res')
      .where(':now BETWEEN start_date AND end_date', { now })
      .andWhere('id = :reservationId', { reservationId })
      .select('id')
      .getRawOne()

    if (!result) throw Error('Checkin unrealized')

    return this.update({ id: result.id } as Reservation, { checkinDate: now } as Reservation)
  }

  public async checkOut(reservationId: number) {
    const now = new Date().toISOString()
    const result = await createQueryBuilder(Reservation, 'res')
      .where('id = :reservationId AND checkin_date IS NOT NULL', {
        reservationId,
        now
      })
      .select('id')
      .getRawOne()

    if (!result) throw Error('Checkout unrealized')

    return this.update({ id: result.id } as Reservation, { checkoutDate: now } as Reservation)
  }

  public findBy({
    reservationId,
    carId,
    userEmail,
    startDate,
    endDate
  }: {
    reservationId?: number
    carId?: number
    userEmail?: string
    startDate?: string
    endDate?: string
  }) {
    let queryBuilder = getRepository(Reservation)
      .createQueryBuilder('res')
      .innerJoin(Car, 'car', 'res.car_id = car.id')
      .innerJoin(CarModel, 'cml', 'car.car_models_id = cml.id')
      .innerJoin(Factory, 'fac', 'cml.factory_id = fac.id')
      .select([
        'car.plate',
        'car.color',
        'res.user_email',
        'res.start_date',
        'res.end_date',
        'res.checkin_date',
        'res.checkout_date'
      ])

    queryBuilder = mountDynamicWhereQueryBuilder<Reservation>(queryBuilder, {
      'car.id': carId,
      'res.user_email': userEmail,
      'res.id': reservationId
    })

    if (startDate && !endDate) queryBuilder.andWhere('res.start_date >= :startDate', { startDate })
    if (!startDate && endDate) queryBuilder.andWhere('res.end_date <= :endDate', { endDate })
    if (startDate && endDate) {
      queryBuilder.andWhere('res.start_date >= :startDate AND res.end_date <= :endDate', {
        endDate,
        startDate
      })
    }

    return queryBuilder
  }
}
