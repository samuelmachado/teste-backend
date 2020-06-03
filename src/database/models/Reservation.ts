import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import { Car } from '@/database/models'
import BaseEntity from '@/database/models/BaseEntity'

@Entity({ name: 'reservations' })
export default class Reservation extends BaseEntity<Reservation> {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ name: 'user_email' })
  userEmail: string

  @Column({ name: 'start_date' })
  startDate: string

  @Column({ name: 'end_date' })
  endDate: string

  @Column({ name: 'checkin_date' })
  checkinDate: string

  @Column({ name: 'checkout_date' })
  checkoutDate: string

  @ManyToOne(() => Car, (car) => car.reservations)
  @JoinColumn({ name: 'car_id' })
  car: Car
}
