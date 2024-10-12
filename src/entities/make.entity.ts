import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import { VehicleType } from './vehicle-type.entity'

@Entity()
export class Make {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  makeId!: number

  @Column()
  makeName!: string

  @OneToMany(() => VehicleType, vehicleType => vehicleType.make, { cascade: true })
  vehicleTypes!: VehicleType[]
}
