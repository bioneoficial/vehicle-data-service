import { Module } from '@nestjs/common'

import { APP_SERVICE } from './app.constants'
import { AppService } from './app.service'

@Module({
  providers: [
    AppService,
    {
      provide: APP_SERVICE,
      useExisting: AppService
    }
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
