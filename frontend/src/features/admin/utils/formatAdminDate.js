const TIME_ZONE = 'Asia/Ho_Chi_Minh';

const getLocale = (lang) => (lang === 'vi' ? 'vi-VN' : 'en-GB');

export function formatAdminDateParts(value, lang = 'vi') {
  if (!value) {
    return { date: '--', time: '' };
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return { date: String(value), time: '' };
  }

  const locale = getLocale(lang);

  return {
    date: new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: TIME_ZONE,
    }).format(parsed),
    time: new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: TIME_ZONE,
    }).format(parsed),
  };
}

export function formatAdminDateTime(value, lang = 'vi') {
  const { date, time } = formatAdminDateParts(value, lang);

  return time ? `${date} ${time}` : date;
}
