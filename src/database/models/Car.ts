import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm'

import { CarModel, Reservation } from '@/database/models'
import BaseEntity from '@/database/models/BaseEntity'

@Entity({ name: 'cars' })
export default class Car extends BaseEntity<Car> {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  plate: string

  @Column()
  color: string

  @Column()
  unity: number

  @Column()
  reserved: boolean

  @OneToOne(() => Reservation, (reservation) => reservation.car)
  reservations: Reservation[]

  @ManyToOne(() => CarModel, (carModel) => carModel.cars)
  @JoinColumn({ name: 'car_models_id' })
  carModel: CarModel
}
