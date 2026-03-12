import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

const ssl =
  env.databaseUrl && !env.databaseUrl.includes('localhost') && !env.databaseUrl.includes('127.0.0.1')
    ? { rejectUnauthorized: false }
    : false;

const pool = env.databaseUrl
  ? new Pool({
      connectionString: env.databaseUrl,
      ssl,
    })
  : null;

export const hasDatabase = Boolean(pool);

export const query = async (text, params = []) => {
  if (!pool) {
    throw new Error('DATABASE_NOT_CONFIGURED');
  }

  return pool.query(text, params);
};

export const checkDatabase = async () => {
  if (!pool) {
    return false;
  }

  try {
    await pool.query('SELECT 1');
    return true;
  } catch {
    return false;
  }
};

export const closeDatabase = async () => {
  if (!pool) {
    return;
  }

  await pool.end();
};
