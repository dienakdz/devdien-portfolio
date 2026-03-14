import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const createOriginMatcher = (allowedOrigins) => {
  const exactOrigins = new Set();
  const wildcardOrigins = [];

  allowedOrigins.forEach((origin) => {
    if (origin.includes('*')) {
      wildcardOrigins.push(new RegExp(`^${escapeRegex(origin).replace(/\\\*/g, '.*')}$`));
      return;
    }

    exactOrigins.add(origin);
  });

  return (origin) => exactOrigins.has(origin) || wildcardOrigins.some((pattern) => pattern.test(origin));
};

const createCorsOptions = () => {
  if (!env.allowedOrigins.length) {
    return {};
  }

  const isAllowedOrigin = createOriginMatcher(env.allowedOrigins);

  return {
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
  };
};

export const createApp = () => {
  const app = express();

  app.set('trust proxy', true);
  app.use(cors(createCorsOptions()));
  app.use(express.json({ limit: '1mb' }));

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

const app = createApp();

export default app;
