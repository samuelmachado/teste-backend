import { Response } from 'express'
import { BAD_REQUEST, NOT_FOUND, CREATED } from 'http-status-codes'
import {
  JsonController,
  Res,
  Post,
  BodyParam,
  HttpError,
  Param,
  Patch,
  Get,
  QueryParam
} from 'routing-controllers'
import Container from 'typedi'
import { createQueryBuilder, SelectQueryBuilder } from 'typeorm'

import { Reservation } from '@/database/models'
import { mountPaginationParams } from '@/utils/QueryBuilder'

import { ReservationService, CarService } from '~/services'

@JsonController('/v1/reservations')
export default class ReservationController {
  constructor(private reservationService: ReservationService, private carService: CarService) {
    this.reservationService = Container.get(ReservationService)
    this.carService = Container.get(CarService)
  }

  private pagination(queryBuilder: SelectQueryBuilder<Reservation>, page: number, perPage: number) {
    const paginationParams = mountPaginationParams(page, perPage)
    return queryBuilder.limit(paginationParams.limit).offset(paginationParams.skip)
  }

  @Get('/')
  async index(
    @QueryParam('car') carId: number,
    @QueryParam('email') userEmail: string,
    @QueryParam('start') startDate: string,
    @QueryParam('end') endDate: string,
    @QueryParam('page') page: number
  ) {
    const queryBuilder = this.reservationService.findBy({ carId, userEmail, startDate, endDate })
    const total = await queryBuilder.getCount()
    const pages = Math.ceil(total / 10)
    const reservations = await this.pagination(queryBuilder, page, 10).getRawMany()

    return {
      total,
      pages,
      reservations,
      currentPage: Number(page) || 1
    }
  }

  @Get('/:id')
  async show(@Param('id') reservationId: number) {
    const queryBuilder = this.reservationService.findBy({ reservationId })
    const reservation = await queryBuilder.getRawOne()

    if (!reservation) throw new HttpError(NOT_FOUND, 'Reservation not found')

    return {
      reservation
    }
  }

  @Post('/')
  async create(@Res() res: Response, @BodyParam('reservation') reservation: Reservation) {
    const car = await this.carService.findOne(reservation.car)

    if (!car) return res.status(BAD_REQUEST).json({ error: 'Car not found' })

    try {
      await this.reservationService.validate(reservation)
    } catch (error) {
      throw new HttpError(BAD_REQUEST, error.message)
    }

    const createdReservation = await this.reservationService.save(reservation)
    return res.status(CREATED).json(createdReservation)
  }

  @Patch('/:id/checkin')
  async checkin(@Param('id') reservationId: number) {
    return this.reservationService.checkIn(reservationId)
  }

  @Patch('/:id/checkout')
  async checkout(@Param('id') reservationId: number) {
    return this.reservationService.checkOut(reservationId)
  }
}
