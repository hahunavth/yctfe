function getEnv(key: string): string {
  if (process.env[key] !== undefined) {
    return process.env[key] as string;
  } else {
    throw Error(`Dotenv not found key: ${key} !`);
  }
}

export const authHeader = {
  "X-API-KEY": getEnv("REACT_APP_API_SECRET"),
};

export const API_ENDPOINT = getEnv("REACT_APP_API_ENDPOINT");
