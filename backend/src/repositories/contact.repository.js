import { query } from '../config/db.js';

export const createContact = async ({ name, email, message, ip, country, region, city }) => {
  const result = await query(
    `
      INSERT INTO contacts (
        name,
        email,
        message,
        ip,
        country,
        region,
        city
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, created_at
    `,
    [name, email, message, ip, country, region, city],
  );

  return result.rows[0];
};


export const fetchContacts = async ({ limit, offset }) => {
  const [itemsResult, countResult] = await Promise.all([
    query(
      `SELECT id, name, email, message, ip, country, region, city, created_at FROM contacts ORDER BY created_at DESC LIMIT $1 OFFSET $2`, [limit, offset],
    ),
    query(
      `SELECT COUNT(*)::int AS total FROM contacts`
    )
  ]);

  return {
    rows: itemsResult.rows,
    total: countResult.rows[0]?.total || 0
  };
};