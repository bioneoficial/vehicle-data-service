import type { DataSource } from 'typeorm'
import type { Seeder, SeederFactoryManager } from 'typeorm-extension'

import { Make } from '#src/entities/make.entity'

export default class MakeSeeder implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(dataSource: DataSource, _factoryManager: SeederFactoryManager): Promise<void> {
    await dataSource.getRepository(Make)
  }
}
