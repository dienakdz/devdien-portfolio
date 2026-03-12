import { Router } from 'express';
import {
  loginController,
  meController,
  refreshController,
  logoutController,
  updateMeController,
  changePasswordController,
} from '../controllers/auth.controller.js';
import { asyncHandler } from '../middlewares/async-handler.js';
import { requireAuth } from '../middlewares/require-auth.js';

export const authRouter = Router();

authRouter.post('/login', asyncHandler(loginController));
authRouter.get('/me', requireAuth, asyncHandler(meController));
authRouter.patch('/me', requireAuth, asyncHandler(updateMeController));
authRouter.patch('/password', requireAuth, asyncHandler(changePasswordController));
authRouter.post('/refresh', asyncHandler(refreshController));
authRouter.post('/logout', asyncHandler(logoutController));
