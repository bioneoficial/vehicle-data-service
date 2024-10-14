import type { CustomSeeder } from '#src/interfaces/custom.seeder.interface'
import type { DataSource, ObjectLiteral } from 'typeorm'
import type { Seeder, SeederConstructor } from 'typeorm-extension'

import { runSeeder } from 'typeorm-extension'

import { NodeEnv } from '#src/config/types/node-env.type'
import { Seeder as SeederEntity } from '#src/database/seeds/entities/seeder.entity'

export class MainSeeder implements Seeder {
  private readonly devSeeders: CustomSeeder[] = []

  private readonly prodSeeders: CustomSeeder[] = []

  private readonly seedsToRun: CustomSeeder[]

  constructor() {
    this.seedsToRun = []

    const env = (process.env['NODE_ENV'] as NodeEnv) || NodeEnv.PRODUCTION

    if ([NodeEnv.DEVELOPMENT, NodeEnv.STAGING, NodeEnv.TEST].includes(env)) {
      this.seedsToRun.push(...this.devSeeders)
    } else {
      this.seedsToRun.push(...this.prodSeeders)
    }
  }

  public async run(dataSource: DataSource): Promise<void> {
    const seederRepository = dataSource.getRepository(SeederEntity)
    const seeds = await seederRepository.find()
    let seederNames: string[] = []

    if (seeds.length) {
      seederNames = seeds.map(seeder => seeder.name)
    }

    const newSeeds = this.seedsToRun.filter(
      seeder => !seederNames.includes(seeder.constructor.name)
    )

    if (!newSeeds.length) {
      return
    }

    for (const seeder of newSeeds) {
      const data = await runSeeder(dataSource, seeder.constructor as SeederConstructor)
      const ids = this.getIds(data?.result as ObjectLiteral[])

      await seederRepository.save({
        name: seeder.constructor.name,
        recordsIds: ids,
        entity: seeder.entity
      })
    }
  }

  private getIds<T extends ObjectLiteral>(data: T[]): number[] {
    return data.map(data => data['id'])
  }
}
