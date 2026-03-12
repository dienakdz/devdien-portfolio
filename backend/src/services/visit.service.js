import { fetchVisitSummary, createVisit as createVisitRecord } from '../repositories/visit.repository.js';
import { sanitizePath } from '../utils/sanitize.js';

export const recordVisit = async ({ path, metadata }) => {
  await createVisitRecord({
    path: sanitizePath(path),
    ip: metadata.ip,
    country: metadata.country,
    region: metadata.region,
    city: metadata.city,
    userAgent: metadata.userAgent,
    deviceType: metadata.deviceType,
    browser: metadata.browser,
    os: metadata.os,
    deviceVendor: metadata.deviceVendor,
    deviceModel: metadata.deviceModel,
  });

  return { ok: true };
};

export const getVisitSummary = async () => {
  const summary = await fetchVisitSummary();

  return {
    totalVisits: summary.total_visits,
    uniqueVisitors: summary.unique_visitors,
  };
};
