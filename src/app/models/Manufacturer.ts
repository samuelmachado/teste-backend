import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import { Model } from './Model';

@Entity('manufacturers')
export class Manufacturer extends BaseEntity {
  constructor(manufacturer: Partial<Manufacturer>) {
    super();
    Object.assign(this, manufacturer);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, nullable: false, unique: true })
  name: string;

  @OneToMany(
    () => Model,
    model => model.manufacturer,
  )
  model: Model[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
