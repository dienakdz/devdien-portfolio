import { Router } from 'express';
import { contactRouter } from './contact.routes.js';
import { docsRouter } from './docs.routes.js';
import { healthRouter } from './health.routes.js';
import { visitRouter } from './visit.routes.js';
import { adminContactRouter } from './admin-contact.routes.js';
import { adminVisitRouter } from './admin-visit.routes.js';
import { authRouter } from './auth.routes.js';

export const apiRouter = Router();

apiRouter.use(docsRouter);
apiRouter.use('/health', healthRouter);
apiRouter.use('/contact', contactRouter);
apiRouter.use('/visits', visitRouter);
apiRouter.use('/admin/contacts', adminContactRouter);
apiRouter.use('/admin/visits', adminVisitRouter);
apiRouter.use('/auth', authRouter);
