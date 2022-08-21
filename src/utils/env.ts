/**
 * get key from .env
 * if key not exists, throw error
 */
export function getEnv(key: string): string {
  if (process.env[key] !== undefined) {
    return process.env[key] as string
  } else {
    throw Error(`Dotenv not found key: ${key} !`)
  }
}
