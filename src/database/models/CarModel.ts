import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'

import { Factory, Car } from '@/database/models'
import BaseEntity from '@/database/models/BaseEntity'

@Entity({ name: 'car_models' })
export default class CarModel extends BaseEntity<CarModel> {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string

  @Column()
  image: string

  @ManyToOne(() => Factory, (factory) => factory.carModels)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory

  @OneToMany(() => Car, (car) => car.carModel)
  cars: Car[]
}
