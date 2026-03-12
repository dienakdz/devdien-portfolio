import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import {env} from '../config/env.js';
import { createHttpError } from '../utils/http-error.js';

const assertJwtConfig = () => {
  if (!env.jwtAccessSecret || !env.jwtRefreshSecret) {
    throw createHttpError(500, 'JWT configuration is missing.');
  }
};

export const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex');

export const signAccessToken = ({ userId, role, sessionId }) => {
  assertJwtConfig();

  return jwt.sign(
    {
      sub: String(userId),
      role,
      sessionId,
      type: 'access',
    },
    env.jwtAccessSecret,
    { expiresIn: env.jwtAccessTtl },
  );
};

export const signRefreshToken = ({ userId, sessionId }) => {
  assertJwtConfig();

  return jwt.sign(
    {
      sub: String(userId),
      sessionId,
      type: 'refresh',
    },
    env.jwtRefreshSecret,
    { expiresIn: env.jwtRefreshTtl },
  );
};

export const verifyAccessToken = (token) => {
  assertJwtConfig();

  try {
    return jwt.verify(token, env.jwtAccessSecret);
  } catch {
    throw createHttpError(401, 'Invalid or expired access token.');
  }
};

export const verifyRefreshToken = (token) => {
  assertJwtConfig();

  try {
    return jwt.verify(token, env.jwtRefreshSecret);
  } catch {
    throw createHttpError(401, 'Invalid or expired refresh token.');
  }
};