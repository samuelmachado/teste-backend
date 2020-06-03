import faker from 'faker'
import { getRepository } from 'typeorm'

import { Factory } from '@/database/models'

export const createFactory = (data?: Factory) => {
  const factory = new Factory({
    name: faker.name.title(),
    carModels: []
  })

  Object.assign(factory, data)
  return factory
}

export const buildFactory = (data?: Factory) => Promise.resolve(createFactory(data))

export const populateFactoryTable = async (qty: number, data?: Factory): Promise<Factory[]> => {
  const factories = Array(qty).fill(data).map(buildFactory)

  return getRepository(Factory).save(await Promise.all(factories))
}
