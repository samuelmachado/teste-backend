import { cleanTables, populateCarTable } from 'test/factories'
import { populateReservationTable, createReservation } from 'test/factories/Reservation'
import Container from 'typedi'
import { Connection } from 'typeorm'

import { Reservation, Car, CarModel, Factory } from '@/database/models'
import TypeormLoader from '@/loaders/TypeormLoader'

import { ReservationService } from '~/services'

describe('ReservationService', () => {
  let connection: Connection
  let reservationService: ReservationService

  beforeAll(async () => {
    connection = await TypeormLoader()
    reservationService = Container.get(ReservationService)
  })

  afterAll(async () => {
    await cleanTables(connection, [Reservation, Car, CarModel, Factory])
    await connection.close()
  })

  describe('#validateInterval', () => {
    describe('when startDate is between existing start and end date from the same car', () => {
      it('returns true', async () => {
        const [car] = await populateCarTable(1)
        await populateReservationTable(1, {
          car,
          startDate: '2020-01-01',
          endDate: '2020-01-03'
        } as Reservation)

        expect(
          reservationService.validateInterval(car.id, '2020-01-02', '2050-01-01')
        ).resolves.toBeTruthy()
      })
    })

    describe('when endDate is between existing start and end date from the same car', () => {
      it('returns true', async () => {
        const [car] = await populateCarTable(1)
        await populateReservationTable(1, {
          car,
          startDate: '2020-01-02',
          endDate: '2020-01-04'
        } as Reservation)

        expect(
          reservationService.validateInterval(car.id, '2020-01-01', '2020-01-02')
        ).resolves.toBeTruthy()
      })
    })

    describe('when exisits a reservation with start and end date within the range', () => {
      it('returns true', async () => {
        const [car] = await populateCarTable(1)
        await populateReservationTable(1, {
          car,
          startDate: '2020-01-02',
          endDate: '2020-01-04'
        } as Reservation)

        expect(
          reservationService.validateInterval(car.id, '2020-01-01', '2020-01-05')
        ).resolves.toBeTruthy()
      })
    })

    describe('when there arent reservations in the range', () => {
      it('returns false', async () => {
        const [car] = await populateCarTable(1)
        await populateReservationTable(1, {
          car,
          startDate: '2020-01-04',
          endDate: '2020-01-05'
        } as Reservation)

        expect(
          reservationService.validateInterval(car.id, '2020-01-01', '2020-01-02')
        ).resolves.toBeFalsy()
      })
    })
  })

  describe('#validate', () => {
    describe('when reservation has a past day', () => {
      beforeEach(() => {
        jest.restoreAllMocks()
        jest.spyOn(Date, 'now').mockReturnValue(new Date('2020-06-05').getTime())
      })

      it('throws an error', async () => {
        const reservation = createReservation({ startDate: '2020-06-01' } as Reservation)

        expect(reservationService.validate(reservation)).rejects.toThrow(
          'The reservation date must be in future day'
        )
      })
    })

    describe('when end date is less than start date', () => {
      beforeEach(() => {
        jest.restoreAllMocks()
        jest.spyOn(Date, 'now').mockReturnValue(new Date('2020-06-05').getTime())
      })

      it('throws an error', async () => {
        const reservation = createReservation({
          startDate: '2020-06-06',
          endDate: '2020-06-01'
        } as Reservation)

        expect(reservationService.validate(reservation)).rejects.toThrow(
          'The end date must be greater than the start date'
        )
      })
    })

    describe('when the reservation has more than three days', () => {
      beforeEach(() => {
        jest.restoreAllMocks()
        jest.spyOn(Date, 'now').mockReturnValue(new Date('2020-06-05').getTime())
      })

      it('throws an error', async () => {
        const reservation = createReservation({
          startDate: '2020-06-06',
          endDate: '2020-06-10'
        } as Reservation)

        expect(reservationService.validate(reservation)).rejects.toThrow(
          'The reservation can have a maximum of 3 days'
        )
      })
    })

    describe('when the reservation has valid dates', () => {
      beforeEach(() => {
        jest.restoreAllMocks()
        jest.spyOn(Date, 'now').mockReturnValue(new Date('2020-06-05').getTime())
      })

      it('returns ok', async () => {
        const [car] = await populateCarTable(1)

        const reservation = createReservation({
          startDate: '2020-06-06',
          endDate: '2020-06-08',
          car
        } as Reservation)

        expect(reservationService.validate(reservation)).resolves.toBeTruthy()
      })
    })
  })

  describe('#checkIn', () => {
    describe('when trying checkin out of date', () => {
      beforeEach(() => {
        jest.restoreAllMocks()
        jest.spyOn(Date, 'now').mockReturnValue(Date.parse('2022-06-01'))
      })

      it('throws an error', async () => {
        const [reservation] = await populateReservationTable(1, {
          startDate: '2022-06-03',
          endDate: '2022-06-04'
        } as Reservation)

        expect(reservationService.checkIn(reservation.id)).rejects.toThrow('Checkin unrealized')
      })
    })

    describe('when trying checkin within date', () => {
      beforeEach(() => {
        jest.restoreAllMocks()
        jest.spyOn(Date, 'now').mockReturnValue(Date.parse('2022-06-03'))
      })

      it('returns ok', async () => {
        const [reservation] = await populateReservationTable(1, {
          startDate: '2022-06-01',
          endDate: '2022-06-04'
        } as Reservation)

        const reservationCheckin = await reservationService.checkIn(reservation.id)
        expect(reservationCheckin.affected).not.toEqual(0)
      })
    })
  })

  describe('#checkOut', () => {
    describe('when checkin date is null', () => {
      it('throws an error', async () => {
        const [reservation] = await populateReservationTable(1, {
          startDate: '2022-06-01',
          endDate: '2022-06-04',
          checkinDate: null
        } as Reservation)

        expect(reservationService.checkOut(reservation.id)).rejects.toThrow('Checkout unrealized')
      })
    })

    describe('when checkin date is defined', () => {
      it('returns ok', async () => {
        const [reservation] = await populateReservationTable(1, {
          startDate: '2022-06-01',
          endDate: '2022-06-04',
          checkinDate: '2022-06-03'
        } as Reservation)

        const result = await reservationService.checkOut(reservation.id)
        expect(result.affected).not.toEqual(0)
      })
    })
  })
})
