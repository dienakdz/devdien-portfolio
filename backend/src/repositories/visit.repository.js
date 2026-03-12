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
