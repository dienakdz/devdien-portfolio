import { Router } from 'express';
import { listContactsController } from '../controllers/admin-contact.controller.js';
import { asyncHandler } from '../middlewares/async-handler.js';
import { requireAdminKey } from '../middlewares/require-admin-key.js';

export const adminContactRouter = Router();

adminContactRouter.get('/', requireAdminKey, asyncHandler(listContactsController));
