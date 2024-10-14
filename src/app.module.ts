import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'

import appConfig from '#src/config/app.config'
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
      load: [appConfig],
      envFilePath: [`.env.${process.env['NODE_ENV'] ?? 'development'}`],

      isGlobal: true
    }),
    MakesModule,
    VehicleTypesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get('DB_HOST') ?? 'localhost',
        port: parseInt(configService.get('DB_PORT', '5432'), 10) || 5432,
        username: configService.get('DB_USERNAME') ?? 'postgres',
        password: configService.get('DB_PASSWORD') ?? 'bione',
        database: configService.get('DB_DATABASE') ?? 'vehicle_db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true
      }),
      inject: [ConfigService]
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
