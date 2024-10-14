import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { DataSource } from 'typeorm'
import { addTransactionalDataSource, getDataSourceByName } from 'typeorm-transactional'

import appConfig from '#src/config/app.config'
import DatabaseConfig from '#src/config/database.config'
import environment from '#src/config/environment'
import { MakesModule } from '#src/makes/makes.module'
import { VehicleTypesModule } from '#src/vehicle-types/vehicle-types.module'

import { APP_SERVICE } from './app.constants'
import { AppService } from './app.service'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: true,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      sortSchema: true,
      playground: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: environment.NODE_ENV === 'production',
      ignoreEnvFile: environment.IGNORE_ENV_FILE === 'true',
      expandVariables: true,
      load: [appConfig, DatabaseConfig]
    }),
    MakesModule,
    VehicleTypesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfig.KEY],
      useFactory(config: ConfigType<typeof DatabaseConfig>) {
        return config
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed')
        }

        return await (getDataSourceByName('default') ??
          addTransactionalDataSource(new DataSource(options)))
      }
    })
  ],
  providers: [
    AppService,
    {
      provide: APP_SERVICE,
      useExisting: AppService
    }
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
