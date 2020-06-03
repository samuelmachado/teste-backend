import faker from 'faker'
import { createCar, populateCarTable } from 'test/factories'
import { getRepository } from 'typeorm'

import { Reservation } from '@/database/models'

export const createReservation = (data?: Reservation) => {
  const reservation = new Reservation({
    userEmail: faker.internet.email(),
    car: createCar(),
    checkinDate: faker.date.future().toISOString(),
    checkoutDate: faker.date.future().toISOString(),
    startDate: faker.date.future().toISOString(),
    endDate: faker.date.future().toISOString()
  })

  Object.assign(reservation, data)
  return reservation
}

export const buildReservation = async (data?: Reservation) => {
  const [car] = await populateCarTable(1)
  const reservation = new Reservation({
    userEmail: faker.internet.email(),
    car,
    checkinDate: faker.date.future().toISOString(),
    checkoutDate: faker.date.future().toISOString(),
    startDate: faker.date.future().toISOString(),
    endDate: faker.date.future().toISOString()
  })

  Object.assign(reservation, data)
  return reservation
}

export const populateReservationTable = async (
  qty: number,
  data?: Reservation
): Promise<Reservation[]> => {
  const reservations = Array(qty).fill(data).map(buildReservation)

  return getRepository(Reservation).save(await Promise.all(reservations))
}
