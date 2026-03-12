import { checkDatabase } from '../config/db.js';
import { isMailerConfigured } from '../config/mailer.js';

export const getHealthController = async (_req, res) => {
  const databaseOk = await checkDatabase();

  res.status(databaseOk ? 200 : 503).json({
    ok: databaseOk,
    services: {
      database: databaseOk ? 'up' : 'down',
      mailer: isMailerConfigured ? 'configured' : 'missing',
    },
  });
};
