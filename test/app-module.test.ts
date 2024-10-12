import type { AppServiceInterface } from '../src/app-service.interface'
import type { TestingModule } from '@nestjs/testing'

import { Test } from '@nestjs/testing'

import { APP_SERVICE } from '../src/app.constants'
import { AppModule } from '../src/app.module'

describe('AppModule', () => {
  let appModule: TestingModule

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
  })

  it('should be defined the app module', () => {
    expect(appModule).toBeDefined()
  })

  it('should return hello world', () => {
    const appService = appModule.get<AppServiceInterface>(APP_SERVICE)

    expect(appService.getHello()).toStrictEqual('Hello World!')
  })
})
