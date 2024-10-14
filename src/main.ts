import type { NestExpressApplication } from '@nestjs/platform-express'

import { ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import helmet from 'helmet'
import { initializeTransactionalContext } from 'typeorm-transactional'

import { AppModule } from './app.module'

/**
 *
 */
async function bootstrap(): Promise<void> {
  initializeTransactionalContext()

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true })
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const appConfig = app.get(ConfigService).get('app')!

  if (appConfig.env === 'production') {
    app.set('trust proxy', true)
  }

  app.enableCors()
  app.enableShutdownHooks()
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: appConfig.defaultApiVersion })
  app.use(helmet())
  app.setGlobalPrefix(appConfig.apiPrefix)
  app.useBodyParser('json', { limit: '256kb' })
  app.useBodyParser('urlencoded', { extended: true, limit: '256kb' })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // if (appConfig.env !== 'production') {
  // }

  await app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Servidor rodando na http://${appConfig.host}:${appConfig.port}`, 'Bootstrap')
  })
}

bootstrap().catch(error => {
  console.error(error, 'Bootstrap')
  process.exit(1)
})
