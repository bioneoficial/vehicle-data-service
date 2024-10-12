import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { VehicleTypesService } from 'src/vehicle-types/vehicle-types.service'

import { VehicleTypesResolver } from './vehicle-types.resolver'
import { VehicleType } from '../entities/vehicle-type.entity'

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  providers: [VehicleTypesService, VehicleTypesResolver]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class VehicleTypesModule {}
