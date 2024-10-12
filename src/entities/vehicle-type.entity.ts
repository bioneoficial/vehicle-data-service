import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { Make } from './make.entity'

@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  vehicleTypeId!: number

  @Column()
  vehicleTypeName!: string

  @ManyToOne(() => Make, make => make.vehicleTypes)
  make!: Make
}
