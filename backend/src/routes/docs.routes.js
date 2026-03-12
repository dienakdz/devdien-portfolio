import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { getOpenApiDocumentController } from '../controllers/docs.controller.js';
import { openApiDocument } from '../docs/openapi.js';

const swaggerUiOptions = {
  explorer: true,
  customSiteTitle: 'DevDien Portfolio API Docs',
};

export const docsRouter = Router();

docsRouter.get('/openapi.json', getOpenApiDocumentController);
docsRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument, swaggerUiOptions));
