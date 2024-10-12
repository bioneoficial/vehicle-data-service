import { Injectable, OnApplicationBootstrap } from '@nestjs/common'

import { MakesService } from '../makes/makes.service'

@Injectable()
export class DataInitializerService implements OnApplicationBootstrap {
  constructor(private readonly makesService: MakesService) {}

  async onApplicationBootstrap(): Promise<void> {
    const count = await this.makesService.countMakes()

    if (count === 0) {
      await this.makesService.fetchAndSaveMakes()
    }
  }
}
