import { createRequire } from 'node:module';
import { UAParser } from 'ua-parser-js';

const require = createRequire(import.meta.url);

let geoip = null;

try {
  geoip = require('geoip-lite');
} catch (error) {
  console.warn('geoip-lite is unavailable. Visitor geo lookup will be skipped.', error);
}

const PRIVATE_IPV4_PATTERNS = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
];

const normalizeIp = (ip) => {
  if (!ip) {
    return null;
  }

  if (ip.startsWith('::ffff:')) {
    return ip.replace('::ffff:', '');
  }

  return ip;
};

const isPrivateIp = (ip) => {
  if (!ip) {
    return true;
  }

  if (ip === '::1' || ip === 'localhost') {
    return true;
  }

  return PRIVATE_IPV4_PATTERNS.some((pattern) => pattern.test(ip));
};

export const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const rawIp =
    typeof forwarded === 'string'
      ? forwarded.split(',')[0]?.trim()
      : req.ip || req.socket?.remoteAddress || null;

  return normalizeIp(rawIp);
};

export const getGeoDetails = (ip) => {
  if (!ip || isPrivateIp(ip)) {
    return {
      country: null,
      region: null,
      city: null,
    };
  }

  if (!geoip) {
    return {
      country: null,
      region: null,
      city: null,
    };
  }

  const geo = geoip.lookup(ip);

  return {
    country: geo?.country || null,
    region: geo?.region || null,
    city: geo?.city || null,
  };
};

export const getUserAgentDetails = (userAgent) => {
  const parser = new UAParser(userAgent || '');
  const result = parser.getResult();

  return {
    userAgent: userAgent || null,
    deviceType: result.device.type || 'desktop',
    browser: result.browser.name
      ? [result.browser.name, result.browser.version].filter(Boolean).join(' ')
      : null,
    os: result.os.name ? [result.os.name, result.os.version].filter(Boolean).join(' ') : null,
    deviceVendor: result.device.vendor || null,
    deviceModel: result.device.model || null,
  };
};

export const buildRequestMetadata = (req) => {
  const ip = getClientIp(req);
  const geo = getGeoDetails(ip);
  const agent = getUserAgentDetails(req.get('user-agent'));

  return {
    ip,
    country: geo.country,
    region: geo.region,
    city: geo.city,
    userAgent: agent.userAgent,
    deviceType: agent.deviceType,
    browser: agent.browser,
    os: agent.os,
    deviceVendor: agent.deviceVendor,
    deviceModel: agent.deviceModel,
  };
};
