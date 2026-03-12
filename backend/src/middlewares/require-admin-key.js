import {env} from '../config/env.js';
import { createHttpError } from '../utils/http-error.js';

export const requireAdminKey = (req, _res, next) => {    
    if(!env.adminApiKey) {
        next(createHttpError(500, 'ADMIN_API_KEY is not configured.'));
        return;
    }

    const providedKey = req.get('x-admin-key');

    if(!providedKey || providedKey !== env.adminApiKey ){
        next(createHttpError(401, 'Unauthorized.'));
        return;
    }

    next();
};