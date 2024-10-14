import type { Make } from '#src/makes/entitites/make.entity'

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  vehicleTypeId!: number

  @Column()
  vehicleTypeName!: string

  @ManyToOne('Make', 'vehicleTypes')
  make!: Make
}
