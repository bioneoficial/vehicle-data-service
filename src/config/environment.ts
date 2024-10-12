import type { Environment } from './types'

import process from 'node:process'

export default process.env as unknown as Environment
