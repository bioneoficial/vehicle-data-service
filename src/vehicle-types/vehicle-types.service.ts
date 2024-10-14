import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { VehicleType } from '#src/vehicle-types/entities/vehicle-type.entity'

@Injectable()
export class VehicleTypesService {
  constructor(
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>
  ) {}

  findAll(): Promise<VehicleType[]> {
    return this.vehicleTypeRepository.find()
  }

  async findOne(vehicleTypeId: number): Promise<VehicleType | undefined> {
    return (await this.vehicleTypeRepository.findOne({ where: { vehicleTypeId } })) ?? undefined
  }
}
