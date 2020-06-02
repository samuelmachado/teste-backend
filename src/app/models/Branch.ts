import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

import { Car } from './Car';

@Entity('branches')
export class Branch extends BaseEntity {
  constructor(branch: Partial<Branch>) {
    super();
    Object.assign(this, branch);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, nullable: false })
  city: string;

  @OneToMany(
    () => Car,
    car => car.branch,
  )
  cars: Car[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
