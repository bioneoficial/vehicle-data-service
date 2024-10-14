import type { AppConfig } from './types'

import { registerAs } from '@nestjs/config'

import environment from './environment'

export default registerAs<AppConfig>('app', () => ({
  env: environment.NODE_ENV ?? 'development',
  port: Number.parseInt(environment.PORT || '4000', 10),
  host: environment.HOST || 'localhost',
  apiUrl: environment.API_URL || 'http://localhost:4000',
  apiPrefix: environment.API_PREFIX ?? 'api',
  defaultApiVersion: '1'
}))
