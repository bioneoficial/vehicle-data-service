import type { DataSource } from 'typeorm'
import type { Seeder } from 'typeorm-extension'

import { Seeder as SeederEntity } from '#src/database/seeds/entities/seeder.entity'

export class RevertSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const seederRepository = dataSource.getRepository(SeederEntity)
    const seeds = await seederRepository.find({ order: { id: 'DESC' } })

    if (seeds.length < 1) {
      return
    }

    // const { id, entity, record_ids } = seeds[0]

    // try {
    //   const deleted = await dataSource.getRepository(entity).delete({ id: In(record_ids) })
    //
    //   if (!deleted.affected) {
    //     Logger.log('Não foi possível a reversão')
    //
    //     return
    //   }
    //
    //   await seederRepository.delete(id)
    // } catch (error) {
    //   Logger.error(error)
    // }
  }
}
