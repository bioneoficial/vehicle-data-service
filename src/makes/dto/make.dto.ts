import { ObjectType, Field, Int } from '@nestjs/graphql'

import { VehicleTypeDTO } from '#src/vehicle-types/dto/vehicle-type.dto'

@ObjectType()
export class MakeDTO {
  @Field(() => Int)
  makeId!: number

  @Field()
  makeName!: string

  @Field(() => [VehicleTypeDTO], { nullable: true })
  vehicleTypes?: VehicleTypeDTO[]
}
