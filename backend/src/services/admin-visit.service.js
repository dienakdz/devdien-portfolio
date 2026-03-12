import { fetchVisits } from '../repositories/visit.repository.js';
import { formatDateTime } from '../utils/date-time.js';

export const listVisits = async ({ page, pageSize }) => {
  const parsedPage = Number(page);
  const parsedPageSize = Number(pageSize);

  const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const safePageSize =
    Number.isFinite(parsedPageSize) && parsedPageSize > 0 ? Math.min(parsedPageSize, 50) : 20;

  const offset = (safePage - 1) * safePageSize;
  const result = await fetchVisits({ limit: safePageSize, offset });

  return {
    page: safePage,
    pageSize: safePageSize,
    total: result.total,
    items: result.rows.map((row) => ({
      id: row.id,
      path: row.path,
      ip: row.ip,
      country: row.country,
      region: row.region,
      city: row.city,
      userAgent: row.user_agent,
      deviceType: row.device_type,
      browser: row.browser,
      os: row.os,
      deviceVendor: row.device_vendor,
      deviceModel: row.device_model,
      visitedAt: formatDateTime(row.visited_at),
    })),
  };
};
