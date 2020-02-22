import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Car } from './Car';

@Entity('bookings')
export class Booking extends BaseEntity {
  constructor(booking: Partial<Booking>) {
    super();
    Object.assign(this, booking);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', { nullable: false })
  start_date: Date;

  @Column('timestamp', { nullable: false })
  end_date: Date;

  @Column('timestamp', { nullable: true })
  checkin_at: Date;

  @Column('timestamp', { nullable: true })
  checkout_at: Date;

  @Column('int', { nullable: false })
  car_id: number;

  @ManyToOne(
    () => Car,
    car => car.id,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
