import { Resolver, Query, Args, Int } from '@nestjs/graphql'

import { MakeDTO } from './dto/make.dto'
import { MakesService } from './makes.service'
import { Make } from '../entities/make.entity'

@Resolver(() => MakeDTO)
export class MakesResolver {
  constructor(private readonly makesService: MakesService) {}

  @Query(() => [MakeDTO])
  getAllMakes(): Promise<MakeDTO[]> {
    return this.makesService.findAll()
  }

  @Query(() => MakeDTO, { nullable: true })
  getMake(@Args('makeId', { type: () => Int }) makeId: number): Promise<Make | null> {
    return this.makesService.findOne(makeId)
  }
}
