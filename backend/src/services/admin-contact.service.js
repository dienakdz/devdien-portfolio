import { fetchContacts } from '../repositories/contact.repository.js';
import { formatDateTime } from '../utils/date-time.js';

export const listContacts = async ({ page, pageSize }) => {
  const parsedPage = Number(page);
  const parsedPageSize = Number(pageSize);

  const safePage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const safePageSize =
    Number.isFinite(parsedPageSize) && parsedPageSize > 0 ? Math.min(parsedPageSize, 50) : 20;

  const offset = (safePage - 1) * safePageSize;
  const result = await fetchContacts({ limit: safePageSize, offset });

  return {
    page: safePage,
    pageSize: safePageSize,
    total: result.total,
    items: result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      ip: row.ip,
      country: row.country,
      region: row.region,
      city: row.city,
      createdAt: formatDateTime(row.created_at),
    })),
  };
};
