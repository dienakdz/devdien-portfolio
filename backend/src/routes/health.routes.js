import { Router } from 'express';
import { getHealthController } from '../controllers/health.controller.js';
import { asyncHandler } from '../middlewares/async-handler.js';

export const healthRouter = Router();

healthRouter.get('/', asyncHandler(getHealthController));
