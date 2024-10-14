import { HttpModule } from '@nestjs/axios'
import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Make } from '#src/makes/entitites/make.entity'
import { VehicleTypesModule } from '#src/vehicle-types/vehicle-types.module'

import { MakesResolver } from './makes.resolver'
import { MakesService } from './makes.service'
import { XmlParserModule } from '../xml-parser/xml-parser.module'

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Make]),
    XmlParserModule,
    forwardRef(() => VehicleTypesModule)
  ],
  providers: [MakesService, MakesResolver]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MakesModule {}
