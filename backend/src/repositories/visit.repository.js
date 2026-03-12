import { query } from '../config/db.js';

export const createVisit = async ({
  path,
  ip,
  country,
  region,
  city,
  userAgent,
  deviceType,
  browser,
  os,
  deviceVendor,
  deviceModel,
}) => {
  await query(
    `
      INSERT INTO page_visits (
        path,
        ip,
        country,
        region,
        city,
        user_agent,
        device_type,
        browser,
        os,
        device_vendor,
        device_model
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `,
    [path, ip, country, region, city, userAgent, deviceType, browser, os, deviceVendor, deviceModel],
  );
};

export const fetchVisitSummary = async () => {
  const result = await query(`
    SELECT
      COUNT(*)::int AS total_visits,
      COUNT(DISTINCT ip)::int AS unique_visitors
    FROM page_visits
  `);

  return result.rows[0] || { total_visits: 0, unique_visitors: 0 };
};

export const fetchVisits = async ({ limit, offset }) => {
  const [itemsResult, countResult] = await Promise.all([
    query(
      `
        SELECT
          id,
          path,
          ip,
          country,
          region,
          city,
          user_agent,
          device_type,
          browser,
          os,
          device_vendor,
          device_model,
          visited_at
        FROM page_visits
        ORDER BY visited_at DESC
        LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    ),
    query(`
      SELECT COUNT(*)::int AS total
      FROM page_visits
    `),
  ]);

  return {
    rows: itemsResult.rows,
    total: countResult.rows[0]?.total || 0,
  };
};
