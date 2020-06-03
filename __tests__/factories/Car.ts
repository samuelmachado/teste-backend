import faker from 'faker'
import { createCarModel, populateCarModelTable } from 'test/factories'
import { getRepository } from 'typeorm'

import { Car } from '@/database/models'

export const createCar = (data?: Car) => {
  const car = new Car({
    carModel: createCarModel(),
    color: faker.name.title(),
    plate: faker.random.word(),
    reservations: [],
    reserved: false,
    unity: faker.random.number()
  })

  Object.assign(car, data)
  return car
}

export const buildCar = async (data?: Car) => {
  const [carModel] = await populateCarModelTable(1)
  const car = new Car({
    carModel,
    color: faker.name.title(),
    plate: faker.random.word(),
    reservations: [],
    reserved: false,
    unity: faker.random.number()
  })

  Object.assign(car, data)
  return car
}

export const populateCarTable = async (qty: number, data?: Car): Promise<Car[]> => {
  const cars = Array(qty).fill(data).map(buildCar)

  return getRepository(Car).save(await Promise.all(cars))
}
