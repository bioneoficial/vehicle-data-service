import 'dotenv/config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'

import { Make } from '#src/makes/entitites/make.entity'
import { VehicleType } from '#src/vehicle-types/entities/vehicle-type.entity'

ConfigModule.forRoot()

const configService = new ConfigService()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST') ?? 'localhost',
  port: parseInt(configService.get('DB_PORT', '5432'), 10) || 5432,
  username: configService.get('DB_USERNAME') ?? 'postgres',
  password: configService.get('DB_PASSWORD') ?? 'postgres',
  database: configService.get('DB_DATABASE') ?? 'postgres',
  entities: [Make, VehicleType],
  migrations: ['./src/migrations/*{.ts,.js}'],
  synchronize: true
})

export default AppDataSource
