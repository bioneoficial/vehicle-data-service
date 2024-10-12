import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MakesResolver } from './makes.resolver'
import { MakesService } from './makes.service'
import { Make } from '../entities/make.entity'
import { VehicleType } from '../entities/vehicle-type.entity'
import { XmlParserModule } from '../xml-parser/xml-parser.module'

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Make, VehicleType]), XmlParserModule],
  providers: [MakesService, MakesResolver]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MakesModule {}
