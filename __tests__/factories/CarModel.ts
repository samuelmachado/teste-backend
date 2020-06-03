import faker from 'faker'
import { createFactory, populateFactoryTable } from 'test/factories/Factory'
import { getRepository } from 'typeorm'

import { CarModel } from '@/database/models'

export const createCarModel = (data?: CarModel) => {
  const carModel = new CarModel({
    name: faker.name.title(),
    factory: createFactory(),
    image: faker.image.imageUrl(),
    cars: []
  })

  Object.assign(carModel, data)
  return carModel
}

export const buildCarModel = async (data?: CarModel) => {
  const [factory] = await populateFactoryTable(1)
  const carModel = new CarModel({
    name: faker.name.title(),
    factory,
    image: faker.image.imageUrl(),
    cars: []
  })

  Object.assign(carModel, data)
  return carModel
}

export const populateCarModelTable = async (qty: number, data?: CarModel): Promise<CarModel[]> => {
  const carModels = Array(qty).fill(data).map(buildCarModel)

  return getRepository(CarModel).save(await Promise.all(carModels))
}
