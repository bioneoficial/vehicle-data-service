import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import type { DataSourceOptions } from 'typeorm'

export type DatabaseConfig = TypeOrmModuleOptions & DataSourceOptions
