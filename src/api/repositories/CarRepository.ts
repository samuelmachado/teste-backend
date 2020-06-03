import { EntityRepository, Repository } from 'typeorm'

import { Car } from '@/database/models'

@EntityRepository(Car)
export default class CarRepository extends Repository<Car> {}
