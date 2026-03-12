import { createHttpError } from '../utils/http-error.js';

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    next(createHttpError(403, 'Forbidden.'));
    return;
  }

  next();
};