/**
 * Format date to a localized string
 * @param {string} dateString - ISO date string
 * @param {string} locale - Language code
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, locale = 'en') => {
  const date = new Date(dateString);
  
  const localeMap = {
    'en': 'en-US',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'ja': 'ja-JP'
  };

  const mappedLocale = localeMap[locale] || 'en-US';

  try {
    return date.toLocaleDateString(mappedLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    // If localization fails, fall back to English
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

/**
 * Get relative time string
 * @param {string} dateString - ISO date string
 * @param {string} locale - Language code
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateString, locale = 'en') => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return rtf.format(-interval, unit);
    }
  }

  return rtf.format(0, 'second');
};

/**
 * Check if date is today
 * @param {string} dateString - ISO date string
 * @returns {boolean} Whether date is today
 */
export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  
  return date.toDateString() === today.toDateString();
};

/**
 * Check if date is within specified days
 * @param {string} dateString - ISO date string
 * @param {number} days - Number of days
 * @returns {boolean} Whether date is within specified days
 */
export const isWithinDays = (dateString, days) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  
  return diffInDays <= days;
};
