import { Router } from 'express';
import { listVisitsController } from '../controllers/admin-visit.controller.js';
import { asyncHandler } from '../middlewares/async-handler.js';
import { requireAuth } from '../middlewares/require-auth.js';
import { requireRole } from '../middlewares/require-role.js';

export const adminVisitRouter = Router();

adminVisitRouter.get('/', requireAuth, requireRole('admin'), asyncHandler(listVisitsController));
