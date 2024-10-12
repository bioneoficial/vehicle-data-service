import type { VehicleTypesService } from 'src/vehicle-types/vehicle-types.service'

import { Resolver, Query, Args, Int } from '@nestjs/graphql'

import { VehicleTypeDTO } from './dto/vehicle-type.dto'
import { VehicleType } from '../entities/vehicle-type.entity'

@Resolver(() => VehicleTypeDTO)
export class VehicleTypesResolver {
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @Query(() => [VehicleTypeDTO])
  getAllVehicleTypes(): Promise<VehicleTypeDTO[]> {
    return this.vehicleTypesService.findAll()
  }

  @Query(() => VehicleTypeDTO, { nullable: true })
  getVehicleType(
    @Args('vehicleTypeId', { type: () => Int }) vehicleTypeId: number
  ): Promise<VehicleType | undefined> {
    return this.vehicleTypesService.findOne(vehicleTypeId)
  }
}
