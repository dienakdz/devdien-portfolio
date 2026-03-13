import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';

const createCorsOptions = () => {
  if (!env.allowedOrigins.length) {
    return {};
  }

  const allowedOrigins = new Set(env.allowedOrigins);

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
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
