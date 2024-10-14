import { Resolver, Query, Args, Int } from '@nestjs/graphql'

import { VehicleTypeDTO } from '#src/vehicle-types/dto/vehicle-type.dto'
import { VehicleType } from '#src/vehicle-types/entities/vehicle-type.entity'
import { VehicleTypesService } from 'src/vehicle-types/vehicle-types.service'

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
