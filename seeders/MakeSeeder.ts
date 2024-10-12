import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Make } from '#src/entities/make.entity';

export default class MakeSeeder implements Seeder {
  async run(dataSource: DataSource, _factoryManager: SeederFactoryManager): Promise<void> {
    dataSource.getRepository(Make)
  }
}
