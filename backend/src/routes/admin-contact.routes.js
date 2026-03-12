import { Router } from 'express';
import { listContactsController } from '../controllers/admin-contact.controller.js';
import { asyncHandler } from '../middlewares/async-handler.js';
import { requireAuth } from '../middlewares/require-auth.js';
import { requireRole } from '../middlewares/require-role.js';

export const adminContactRouter = Router();

adminContactRouter.get('/', requireAuth, requireRole('admin'), asyncHandler(listContactsController));
