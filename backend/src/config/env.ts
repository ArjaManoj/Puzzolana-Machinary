import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend directory or project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/puzzolana_machinery',
  JWT_SECRET: process.env.JWT_SECRET || 'puzzolana_enterprise_machinery_secret_key_2026_production_grade_32char',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587,
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'Puzzolana Machinery <no-reply@puzzolana.com>',
  ADMIN_NOTIFICATION_EMAIL: process.env.ADMIN_NOTIFICATION_EMAIL || 'sales@puzzolana.com',
  UPLOAD_PROVIDER: process.env.UPLOAD_PROVIDER || 'local',
  UPLOAD_MAX_SIZE_MB: process.env.UPLOAD_MAX_SIZE_MB ? parseInt(process.env.UPLOAD_MAX_SIZE_MB, 10) : 15,
};
