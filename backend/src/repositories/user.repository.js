import { query } from '../config/db.js';

export const findUserByEmail = async ({ email }) => {
  const result = await query(
    `
      SELECT id, email, password_hash, full_name, role, is_active, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [email],
  );

  return result.rows[0] || null;
};

export const findUserById = async ({ id }) => {
  const result = await query(
    `
      SELECT id, email, full_name, role, is_active, created_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  return result.rows[0] || null;
};

export const findUserAuthById = async ({ id }) => {
  const result = await query(
    `
      SELECT id, email, password_hash, full_name, role, is_active, created_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  return result.rows[0] || null;
};

export const updateUserById = async ({ id, email, fullName }) => {
  const result = await query(
    `
      UPDATE users
      SET email = $2,
          full_name = $3
      WHERE id = $1
      RETURNING id, email, full_name, role, is_active, created_at
    `,
    [id, email, fullName],
  );

  return result.rows[0] || null;
};

export const updateUserPasswordHashById = async ({ id, passwordHash }) => {
  const result = await query(
    `
      UPDATE users
      SET password_hash = $2
      WHERE id = $1
      RETURNING id
    `,
    [id, passwordHash],
  );

  return result.rows[0] || null;
};
