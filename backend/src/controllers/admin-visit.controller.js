import { listVisits } from '../services/admin-visit.service.js';

export const listVisitsController = async (req, res) => {
  const result = await listVisits({
    page: req.query.page,
    pageSize: req.query.pageSize,
  });

  res.json(result);
};
