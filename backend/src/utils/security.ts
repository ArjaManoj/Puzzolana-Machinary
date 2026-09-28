import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export interface JwtUserPayload {
  userId: string;
  email: string;
  role: 'admin' | 'editor';
  name: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (plain: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};

export const generateAuthToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const verifyAuthToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, ENV.JWT_SECRET) as JwtUserPayload;
};
