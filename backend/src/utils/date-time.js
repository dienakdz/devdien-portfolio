import { env } from '../config/env.js';

const dateTimeFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: env.appTimeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const offsetFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: env.appTimeZone,
  timeZoneName: 'shortOffset',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

const getDateParts = (date) =>
  Object.fromEntries(
    dateTimeFormatter
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  );

const getOffset = (date) => {
  const rawOffset =
    offsetFormatter.formatToParts(date).find((part) => part.type === 'timeZoneName')?.value || 'GMT';

  if (rawOffset === 'GMT') {
    return 'Z';
  }

  const match = rawOffset.match(/^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/);

  if (!match) {
    return 'Z';
  }

  const [, sign, hours, minutes = '00'] = match;

  return `${sign}${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

export const formatDateTime = (value) => {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const { year, month, day, hour, minute, second } = getDateParts(date);
  const offset = getOffset(date);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${offset}`;
};
