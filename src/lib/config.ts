const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];

  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  
  return value || defaultValue!;
};

const getEnvVarAsNumber = (key: string, defaultValue?: number): number => {
  const value = process.env[key];

  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return parseInt(value || String(defaultValue), 10);
};

export const config = {
  NEXT_PUBLIC_URL: getEnvVar('NEXT_PUBLIC_URL'),
  SESSION_COOKIE_NAME: getEnvVar('SESSION_COOKIE_NAME'),
  SESSION_COOKIE_MAX_AGE: getEnvVarAsNumber('SESSION_COOKIE_MAX_AGE', 86400),
  SESSION_SECRET: getEnvVar('SESSION_SECRET'),
};