import type { DatabaseConfig } from './types'

import { registerAs } from '@nestjs/config'

import environment from './environment'

export default registerAs<DatabaseConfig>('database', () => ({
  type: (environment.DB_TYPE ?? 'postgres') as 'postgres',
  schema: environment.DB_SCHEMA ?? 'public',
  host: environment.DB_HOST,
  port: Number.parseInt(environment.DB_PORT, 10),
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  entities: ['./**/*.entity.js', './dist/**/*.entity.js'],
  migrations: ['./database/migrations/*.js', './dist/database/migrations/*.js'],
  autoLoadEntities: true,
  synchronize: false,
  useUTC: true,
  migrationsTransactionMode: 'each'
}))

export type { DatabaseConfig } from './types/database-config.type'
