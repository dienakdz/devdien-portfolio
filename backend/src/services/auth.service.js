import ms from 'ms';
import {
  findUserByEmail,
  findUserById,
  findUserAuthById,
  updateUserById,
  updateUserPasswordHashById,
} from '../repositories/user.repository.js';
import {
  createSession,
  updateSessionRefreshTokenHash,
  findActiveSessionByRefreshTokenHash,
  revokeSessionById,
  revokeSessionsByUserId,
} from '../repositories/session.repository.js';
import { hashPassword, verifyPassword } from './password.service.js';
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from './token.service.js';
import { createHttpError } from '../utils/http-error.js';
import { env } from '../config/env.js';
import { isValidEmail, sanitizeText } from '../utils/sanitize.js';

export const login = async ({ email, password, metadata }) => {
    if (!email || !password) {
        throw createHttpError(400, 'Email and password are required.');
    }

    const user = await findUserByEmail({ email });

    if (!user || !user.is_active) {
        throw createHttpError(401, 'Invalid credentials.');
    }

    const passwordOk = await verifyPassword(password, user.password_hash);

    if (!passwordOk) {
        throw createHttpError(401, 'Invalid credentials.');
    }


    const refreshTtlMs = ms(env.jwtRefreshTtl);
    const expiresAt = new Date(Date.now() + refreshTtlMs);

    const session = await createSession({
        userId: user.id,
        refreshTokenHash: 'pending',
        ip: metadata?.ip || null,
        userAgent: metadata?.userAgent || null,
        expiresAt,
    });

    const accessToken = signAccessToken({
        userId: user.id,
        role: user.role,
        sessionId: session.id,
    });

    const refreshToken = signRefreshToken({
        userId: user.id,
        sessionId: session.id,
    });

    const refreshTokenHash = hashToken(refreshToken);

    await updateSessionRefreshTokenHash({
        id: session.id,
        refreshTokenHash,
    });

    return {
        user: {
            id: user.id,
            email: user.email,
            fullName: user.full_name,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};

export const getCurrentUser = async ({ userId }) => {
  const user = await findUserById({ id: userId });

    if (!user || !user.is_active) {
        throw createHttpError(401, 'User not found or inactive.');
    }

    return {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
  };
};

export const updateCurrentUser = async ({ userId, email, fullName }) => {
  const user = await findUserById({ id: userId });

  if (!user || !user.is_active) {
    throw createHttpError(401, 'User not found or inactive.');
  }

  const emailWasProvided = typeof email !== 'undefined';
  const fullNameWasProvided = typeof fullName !== 'undefined';

  if (!emailWasProvided && !fullNameWasProvided) {
    throw createHttpError(400, 'At least one field is required.');
  }

  let nextEmail = user.email;
  let nextFullName = user.full_name;

  if (emailWasProvided) {
    const sanitizedEmail = sanitizeText(email, 320)?.toLowerCase() || null;

    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      throw createHttpError(400, 'A valid email is required.');
    }

    if (sanitizedEmail !== user.email) {
      const existingUser = await findUserByEmail({ email: sanitizedEmail });

      if (existingUser && existingUser.id !== user.id) {
        throw createHttpError(409, 'Email is already in use.');
      }
    }

    nextEmail = sanitizedEmail;
  }

  if (fullNameWasProvided) {
    nextFullName = sanitizeText(fullName, 160);
  }

  const updatedUser = await updateUserById({
    id: user.id,
    email: nextEmail,
    fullName: nextFullName,
  });

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    fullName: updatedUser.full_name,
    role: updatedUser.role,
  };
};

export const changeCurrentUserPassword = async ({ userId, currentPassword, newPassword }) => {
  if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
    throw createHttpError(400, 'Current password and new password are required.');
  }

  if (newPassword.length < 8) {
    throw createHttpError(400, 'New password must be at least 8 characters.');
  }

  if (newPassword.length > 128) {
    throw createHttpError(400, 'New password is too long.');
  }

  const user = await findUserAuthById({ id: userId });

  if (!user || !user.is_active) {
    throw createHttpError(401, 'User not found or inactive.');
  }

  const currentPasswordOk = await verifyPassword(currentPassword, user.password_hash);

  if (!currentPasswordOk) {
    throw createHttpError(401, 'Current password is incorrect.');
  }

  const passwordUnchanged = await verifyPassword(newPassword, user.password_hash);

  if (passwordUnchanged) {
    throw createHttpError(400, 'New password must be different from the current password.');
  }

  const passwordHash = await hashPassword(newPassword);

  await updateUserPasswordHashById({
    id: user.id,
    passwordHash,
  });

  await revokeSessionsByUserId({ userId: user.id });

  return {
    ok: true,
    requiresLogin: true,
  };
};

export const refresh = async ({ refreshToken }) => {
    if (!refreshToken) {
        throw createHttpError(400, 'Refresh token is required.');
    }

    const payload = verifyRefreshToken(refreshToken);

    if (payload.type !== 'refresh') {
        throw createHttpError(401, 'Invalid refresh token.');
    }

    const refreshTokenHash = hashToken(refreshToken);
    const session = await findActiveSessionByRefreshTokenHash({ refreshTokenHash });

    if (!session || session.id !== Number(payload.sessionId)) {
        throw createHttpError(401, 'Invalid refresh session.');
    }

    const user = await findUserById({ id: Number(payload.sub) });

    if (!user || !user.is_active) {
        throw createHttpError(401, 'User not found or inactive.');
    }

    const accessToken = signAccessToken({
        userId: user.id,
        role: user.role,
        sessionId: session.id,
    });

    const nextRefreshToken = signRefreshToken({
        userId: user.id,
        sessionId: session.id,
    });

    await updateSessionRefreshTokenHash({
        id: session.id,
        refreshTokenHash: hashToken(nextRefreshToken),
    });

    return {
        accessToken,
        refreshToken: nextRefreshToken,
    };
}

export const logout = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw createHttpError(400, 'Refresh token is required.');
  }

  const payload = verifyRefreshToken(refreshToken);

  if (payload.type !== 'refresh') {
    throw createHttpError(401, 'Invalid refresh token.');
  }

  const refreshTokenHash = hashToken(refreshToken);
  const session = await findActiveSessionByRefreshTokenHash({ refreshTokenHash });

  if (!session || session.id !== Number(payload.sessionId)) {
    throw createHttpError(401, 'Invalid logout session.');
  }

  await revokeSessionById({ id: session.id });

  return { ok: true };
};
