import { query } from '../config/db.js';

export const createSession = async ({ userId, refreshTokenHash, ip, userAgent, expiresAt }) => {
    const result = await query(
        `
      INSERT INTO sessions (
        user_id,
        refresh_token_hash,
        ip,
        user_agent,
        expires_at
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, user_id, expires_at, created_at
    `,
        [userId, refreshTokenHash, ip, userAgent, expiresAt],
    );

    return result.rows[0];
};

export const findActiveSessionByRefreshTokenHash = async ({ refreshTokenHash }) => {
    const result = await query(
        `
      SELECT id, user_id, refresh_token_hash, expires_at, revoked_at, created_at
      FROM sessions
      WHERE refresh_token_hash = $1
        AND revoked_at IS NULL
        AND expires_at > NOW()
      LIMIT 1
    `,
        [refreshTokenHash],
    );

    return result.rows[0] || null;
};

export const revokeSessionById = async ({ id }) => {
    await query(
        `
      UPDATE sessions
      SET revoked_at = NOW()
      WHERE id = $1
    `,
        [id],
    );
};

export const revokeSessionsByUserId = async ({ userId }) => {
    await query(
        `
      UPDATE sessions
      SET revoked_at = NOW()
      WHERE user_id = $1
        AND revoked_at IS NULL
    `,
        [userId],
    );
};

export const updateSessionRefreshTokenHash = async ({ id, refreshTokenHash }) => {
    await query(
        `
        UPDATE sessions
        SET refresh_token_hash = $2
        WHERE id = $1
        `,
        [id, refreshTokenHash],
    );
};
