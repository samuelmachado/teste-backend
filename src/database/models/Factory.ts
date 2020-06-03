import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { CarModel } from '@/database/models'
import BaseEntity from '@/database/models/BaseEntity'

@Entity({ name: 'factories' })
export default class Factory extends BaseEntity<Factory> {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string

  @OneToMany(() => CarModel, (carModel) => carModel.factory)
  carModels: CarModel[]
}
