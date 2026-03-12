import { Router } from 'express';
import { createVisitController, getVisitSummaryController } from '../controllers/visit.controller.js';
import { asyncHandler } from '../middlewares/async-handler.js';
import { visitRateLimiter } from '../middlewares/rate-limit.js';

export const visitRouter = Router();

visitRouter.get('/summary', asyncHandler(getVisitSummaryController));
visitRouter.post('/', visitRateLimiter, asyncHandler(createVisitController));
