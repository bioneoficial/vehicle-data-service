import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MakesModule } from '#src/makes/makes.module'
import { VehicleType } from '#src/vehicle-types/entities/vehicle-type.entity'
import { VehicleTypesResolver } from '#src/vehicle-types/vehicle-types.resolver'
import { VehicleTypesService } from '#src/vehicle-types/vehicle-types.service'

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType]), forwardRef(() => MakesModule)],
  providers: [VehicleTypesService, VehicleTypesResolver]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class VehicleTypesModule {}
