import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Car } from './Car';
import { Manufacturer } from './Manufacturer';

@Entity('models')
export class Model extends BaseEntity {
  constructor(model: Partial<Model>) {
    super();
    Object.assign(this, model);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, nullable: false, unique: true })
  name: string;

  @Column('varchar', { length: 255, nullable: false })
  image: string;

  @OneToMany(
    () => Car,
    car => car.model,
  )
  cars: Car[];

  @Column('int', { nullable: false })
  manufacturer_id: number;

  @ManyToOne(
    () => Manufacturer,
    manufacturer => manufacturer.id,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
