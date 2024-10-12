import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { lastValueFrom } from 'rxjs'
import { Repository } from 'typeorm'

import { Make } from '../entities/make.entity'
import { VehicleType } from '../entities/vehicle-type.entity'
import { XmlParserService } from '../xml-parser/xml-parser.service'

interface ParsedMakeData {
  Response: {
    Results: {
      AllVehicleMakes: { Make_ID: string; Make_Name: string }[]
    }
  }
}

interface ParsedVehicleTypeData {
  Response: {
    Results: {
      VehicleTypesForMakeIds: {
        VehicleTypesForMakeId:
          | { VehicleTypeId: string; VehicleTypeName: string }
          | { VehicleTypeId: string; VehicleTypeName: string }[]
      }
    }
  }
}

@Injectable()
export class MakesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly xmlParserService: XmlParserService,
    @InjectRepository(Make)
    private readonly makeRepository: Repository<Make>
  ) {}

  async fetchAndSaveMakes(): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.httpService.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML')
      )

      const parsedData = (await this.xmlParserService.parseXml(response.data)) as ParsedMakeData

      const makes = parsedData.Response.Results.AllVehicleMakes

      for (const makeData of makes) {
        const make = new Make()

        make.makeId = Number.parseInt(makeData.Make_ID)
        make.makeName = makeData.Make_Name

        // Fetch and assign vehicle types
        make.vehicleTypes = await this.fetchVehicleTypesForMake(make.makeId)

        await this.makeRepository.save(make)
      }
    } catch {
      throw new Error('Failed to fetch and save makes')
    }
  }

  async fetchVehicleTypesForMake(makeId: number): Promise<VehicleType[]> {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`
        )
      )

      const parsedData = (await this.xmlParserService.parseXml(
        response.data
      )) as ParsedVehicleTypeData
      const vehicleTypesData =
        parsedData.Response?.Results?.VehicleTypesForMakeIds?.VehicleTypesForMakeId

      if (!vehicleTypesData) {
        return []
      }

      const vehicleTypes: VehicleType[] = []

      if (Array.isArray(vehicleTypesData)) {
        for (const vtData of vehicleTypesData) {
          const vehicleType = new VehicleType()

          vehicleType.vehicleTypeId = Number.parseInt(vtData.VehicleTypeId)
          vehicleType.vehicleTypeName = vtData.VehicleTypeName
          vehicleTypes.push(vehicleType)
        }
      } else {
        const vehicleType = new VehicleType()

        vehicleType.vehicleTypeId = Number.parseInt(vehicleTypesData.VehicleTypeId)
        vehicleType.vehicleTypeName = vehicleTypesData.VehicleTypeName
        vehicleTypes.push(vehicleType)
      }

      return vehicleTypes
    } catch {
      return []
    }
  }

  findAll(): Promise<Make[]> {
    return this.makeRepository.find({ relations: ['vehicleTypes'] })
  }

  findOne(makeId: number): Promise<Make | null> {
    return (
      this.makeRepository.findOne({ where: { makeId }, relations: ['vehicleTypes'] }) || undefined
    )
  }

  countMakes(): Promise<number> {
    return this.makeRepository.count()
  }
}
