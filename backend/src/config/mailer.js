import nodemailer from 'nodemailer';
import { env } from './env.js';

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const transporter =
  env.smtpHost && env.smtpUser && env.smtpPass
    ? nodemailer.createTransport({
        host: env.smtpHost,
        port: env.smtpPort,
        secure: env.smtpSecure,
        auth: {
          user: env.smtpUser,
          pass: env.smtpPass,
        },
      })
    : null;

export const isMailerConfigured = Boolean(transporter && env.mailFrom && env.contactToEmail);

export const sendContactNotification = async (contact) => {
  if (!isMailerConfigured) {
    return { delivered: false };
  }

  const { name, email, message, ip, country, region, city, createdAt } = contact;
  const safeName = escapeHtml(name || 'Anonymous visitor');
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');
  const safeIp = escapeHtml(ip || 'unknown');
  const safeLocation = escapeHtml([city, region, country].filter(Boolean).join(', ') || 'unknown');
  const safeCreatedAt = escapeHtml(createdAt);

  await transporter.sendMail({
    from: env.mailFrom,
    to: env.contactToEmail,
    replyTo: email,
    subject: `[Portfolio Contact] ${name || 'Anonymous'} <${email}>`,
    text: [
      `Name: ${name || 'Anonymous visitor'}`,
      `Email: ${email}`,
      `IP: ${ip || 'unknown'}`,
      `Location: ${[city, region, country].filter(Boolean).join(', ') || 'unknown'}`,
      `Created at: ${createdAt}`,
      '',
      message,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; color: #12202a; line-height: 1.6;">
        <h2 style="margin: 0 0 16px;">New portfolio contact</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>IP:</strong> ${safeIp}</p>
        <p><strong>Location:</strong> ${safeLocation}</p>
        <p><strong>Created at:</strong> ${safeCreatedAt}</p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #d7e2e7;" />
        <p style="white-space: normal;">${safeMessage}</p>
      </div>
    `,
  });

  return { delivered: true };
};
