import { AppConfig, Environment } from './types';

export default (): AppConfig => ({
  app: {
    version: process.env.APP_VERSION,
    env: process.env.APP_ENV as Environment,
    port: +process.env.APP_PORT,
  },
  auth: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtRefreshTokenKey: process.env.JWT_REF_SECRET_TOKEN_KEY,
  },
});
