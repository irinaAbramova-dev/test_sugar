export type Environment = string;

export interface AppConfig {
  app: {
    version: string;
    env: Environment;
    port: number;
  };
  auth: {
    jwtSecretKey: string;
    jwtRefreshTokenKey: string;
  };
}
