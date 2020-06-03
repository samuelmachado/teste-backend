import { Service } from 'typedi'
import { FindConditions } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { Car } from '@/database/models'

import { CarRepository } from '~/repositories'

@Service()
export default class CarService {
  constructor(@OrmRepository() private repository: CarRepository) {}

  public async findOne(options?: FindConditions<Car>): Promise<Car | undefined> {
    return this.repository.findOne(options)
  }

  public async create(car: Car): Promise<Car | undefined> {
    return this.repository.save(car)
  }
}
