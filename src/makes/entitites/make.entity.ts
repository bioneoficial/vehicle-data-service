import type { VehicleType } from '../../vehicle-types/entities/vehicle-type.entity'

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Make {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  makeId!: number

  @Column()
  makeName!: string

  @OneToMany('VehicleType', 'make', { cascade: true })
  vehicleTypes!: VehicleType[]
}
