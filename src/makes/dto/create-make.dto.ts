import { InputType, Field, Int } from '@nestjs/graphql'

import { VehicleTypeDTO } from '#src/vehicle-types/dto/vehicle-type.dto'

@InputType()
export class CreateMakeDTO {
  @Field(() => Int)
  makeId!: number

  @Field()
  makeName!: string

  @Field(() => [VehicleTypeDTO], { nullable: true })
  vehicleTypes?: VehicleTypeDTO[]
}
