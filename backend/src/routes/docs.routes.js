import { Router } from 'express';
import { getDocsPageController, getOpenApiDocumentController } from '../controllers/docs.controller.js';

export const docsRouter = Router();

docsRouter.get('/openapi.json', getOpenApiDocumentController);
docsRouter.get('/docs', (req, res) => {
  res.redirect(308, `${req.baseUrl}/docs/`);
});
docsRouter.get('/docs/', getDocsPageController);
