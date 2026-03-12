import { verifyAccessToken } from "../services/token.service.js";
import { findUserById } from "../repositories/user.repository.js";
import { createHttpError } from "../utils/http-error.js";

export const requireAuth = async (req, _res, next) => {
    const authHeader = req.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        next(createHttpError(401, 'Missing bearer token.'));
        return;
    }

    const token = authHeader.slice(7).trim();
    const payload = verifyAccessToken(token);

    if (payload.type !== 'access') {
        next(createHttpError(401, 'Invalid access token.'));
        return;
    }

    const user = await findUserById({ id: Number(payload.sub) });

    if (!user || !user.is_active) {
        next(createHttpError(401, 'User not found or inactive.'));
        return;
    }

    req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.full_name,
        sessionId: payload.sessionId,
    };

    next();
}