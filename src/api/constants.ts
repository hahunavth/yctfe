import { getEnv } from '@/utils/env'

export const API_ENDPOINT = getEnv('REACT_APP_API_ENDPOINT')

export const authHeader = {
  'X-API-KEY': getEnv('REACT_APP_API_SECRET'),
}
