import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GeneralClassValidatorService } from './general-class-validator.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [GeneralClassValidatorService],
  exports: [GeneralClassValidatorService]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GeneralClassValidatorModule {}
