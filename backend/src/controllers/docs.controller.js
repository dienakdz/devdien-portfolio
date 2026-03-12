import { openApiDocument } from '../docs/openapi.js';

export const getOpenApiDocumentController = (_req, res) => {
  res.json(openApiDocument);
};
