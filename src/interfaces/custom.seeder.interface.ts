import type { Seeder } from 'typeorm-extension'

export interface CustomSeeder extends Seeder {
  entity: string
}
