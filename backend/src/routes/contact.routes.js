import { Router } from 'express';
import { createContactController } from '../controllers/contact.controller.js';
import { asyncHandler } from '../middlewares/async-handler.js';
import { contactRateLimiter } from '../middlewares/rate-limit.js';

export const contactRouter = Router();

contactRouter.post('/', contactRateLimiter, asyncHandler(createContactController));
