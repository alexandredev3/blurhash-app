import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.dev',
});

export const { APP_URL } = process.env;

export const {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} = process.env;
