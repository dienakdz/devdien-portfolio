import { getVisitSummary, recordVisit } from '../services/visit.service.js';
import { buildRequestMetadata } from '../utils/request-metadata.js';

export const createVisitController = async (req, res) => {
  const result = await recordVisit({
    path: req.body?.path,
    metadata: buildRequestMetadata(req),
  });

  res.status(201).json(result);
};

export const getVisitSummaryController = async (_req, res) => {
  const summary = await getVisitSummary();
  res.json(summary);
};
