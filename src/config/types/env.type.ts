export interface Environment {
  API_PREFIX?: string
  NODE_ENV?: string
  HOST: string
  PORT: string
  API_URL: string
  SWAGGER_API_PATH?: string
  IGNORE_ENV_FILE?: 'true' | 'false'
  DB_TYPE?: string
  DB_SCHEMA?: string
  DB_HOST: string
  DB_PORT: string
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_NAME: string
  LOGGER_NAME: string
  LOGGER_ENABLED: string
  LOGGER_LOG_LEVEL: string
}
