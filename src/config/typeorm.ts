import 'dotenv/config'
import type { DatabaseConfig } from './types'

import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'

import databaseConfig from './database.config'

ConfigModule.forRoot()

const databaseInfo = databaseConfig() as unknown as DatabaseConfig

const connectionSource = new DataSource(databaseInfo)

export default connectionSource
