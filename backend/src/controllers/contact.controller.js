import { submitContact } from '../services/contact.service.js';
import { buildRequestMetadata } from '../utils/request-metadata.js';

export const createContactController = async (req, res) => {
  const result = await submitContact({
    ...req.body,
    metadata: buildRequestMetadata(req),
  });

  res.status(201).json(result);
};
