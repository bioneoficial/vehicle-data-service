import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class VehicleTypeDTO {
  @Field(() => Int)
  vehicleTypeId!: number

  @Field()
  vehicleTypeName!: string
}
