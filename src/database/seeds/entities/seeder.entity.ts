import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('seeds')
export class Seeder {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ unique: true })
  name!: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date

  @Column({ type: Number, array: true, name: 'record_ids' })
  recordIds!: number[]

  @Column()
  entity!: string
}
