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

import { Branch } from './Branch';
import { Model } from './Model';

@Entity('cars')
export class Car extends BaseEntity {
  constructor(car: Partial<Car>) {
    super();
    Object.assign(this, car);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 7, nullable: false, unique: true })
  license_plate: string;

  @Column('varchar', { length: 20, nullable: false })
  color: string;

  @Column('int', { nullable: false })
  model_id: number;

  @ManyToOne(
    () => Model,
    model => model.id,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'model_id' })
  model: Model;

  @Column('int', { nullable: false })
  branch_id: number;

  @ManyToOne(
    () => Branch,
    branch => branch.id,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
