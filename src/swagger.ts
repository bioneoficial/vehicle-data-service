import type { AppConfig } from './config/types/app-config.type'
import type { INestApplication } from '@nestjs/common'
import type { SwaggerCustomOptions } from '@nestjs/swagger'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export const setupSwagger = (app: INestApplication, appConfig: AppConfig): void => {
  const config = new DocumentBuilder()
    .setTitle('Bione-Vehicle API Docs')
    .setDescription('API documentation for the auto generated API.')
    .setVersion('1.0.0')
    .addServer(appConfig.apiUrl, 'API')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, { ...config, openapi: '3.1.0' })
  const customOptions: SwaggerCustomOptions = {
    jsonDocumentUrl: `/${appConfig.swaggerApiPath}.json`,
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      persistAuthorization: 'true'
    }
  }

  SwaggerModule.setup(appConfig.swaggerApiPath, app, document, customOptions)
}
