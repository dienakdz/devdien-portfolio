import { sendContactNotification } from '../config/mailer.js';
import { createContact as createContactRecord } from '../repositories/contact.repository.js';
import { createHttpError } from '../utils/http-error.js';
import { isValidEmail, sanitizeText } from '../utils/sanitize.js';

export const submitContact = async ({ name, email, message, metadata }) => {
  const sanitizedName = sanitizeText(name, 160);
  const sanitizedEmail = sanitizeText(email, 320);
  const sanitizedMessage = sanitizeText(message, 4000);

  if (!sanitizedEmail || !isValidEmail(sanitizedEmail) || !sanitizedMessage) {
    throw createHttpError(400, 'Invalid contact payload.');
  }

  const savedContact = await createContactRecord({
    name: sanitizedName,
    email: sanitizedEmail,
    message: sanitizedMessage,
    ip: metadata.ip,
    country: metadata.country,
    region: metadata.region,
    city: metadata.city,
  });

  let mailDelivered = false;

  try {
    const delivery = await sendContactNotification({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      ip: metadata.ip,
      country: metadata.country,
      region: metadata.region,
      city: metadata.city,
      createdAt: savedContact.created_at.toISOString(),
    });
    mailDelivered = delivery.delivered;
  } catch (error) {
    console.error('Failed to send contact email:', error);
  }

  return {
    ok: true,
    mailDelivered,
  };
};
