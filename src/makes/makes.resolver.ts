import { Resolver, Query, Args, Int } from '@nestjs/graphql'

import { MakeDTO } from './dto/make.dto'
import { MakesService } from './makes.service'

@Resolver(() => MakeDTO)
export class MakesResolver {
  constructor(private readonly makesService: MakesService) {}

  @Query(() => [MakeDTO], { name: 'getAllMakes' })
  getAllMakes(): Promise<MakeDTO[]> {
    return this.makesService.findAll()
  }

  @Query(() => MakeDTO, { name: 'getMake', nullable: true })
  getMake(@Args('makeId', { type: () => Int }) makeId: number): Promise<MakeDTO | null> {
    return this.makesService.findOne(makeId)
  }
}
