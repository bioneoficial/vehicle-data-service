import type { Environment } from './types'

import { config } from 'dotenv'

config()

export default process.env as unknown as Environment
