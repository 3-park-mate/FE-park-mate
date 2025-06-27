/**
 * @param dateString
 * @returns `MM.DD(요일) HH:MM`
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

/**
 * @param dateString
 * @returns-> { time: `hh:mm`, date: `MM.DD (요일)` }
 */
export const formatDateParts = (dateString: string) => {
  const date = new Date(dateString);
  const formatted = new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  const timeRegex = /\d{2}:\d{2}/;
  const timeMatch = formatted.match(timeRegex);
  const time = timeMatch?.[0] ?? '';

  const dateOnly = formatted.replace(timeRegex, '').trim();

  return { time, date: dateOnly };
};

/**
 *@param dateString
 *@returns `hh:mm AM/PM`
 */
export const formatTimeENUtils = (dateString: string) => {
  const date = new Date(dateString);
  const formatted = new Intl.DateTimeFormat('en-EN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
  return formatted;
};

export const formatFullDatePartsUtils = (dateString: string) => {
  const date = new Date(dateString);
  const formatted = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  const timeRegex = /\d{2}:\d{2}/;
  const timeMatch = formatted.match(timeRegex);
  const time = timeMatch?.[0] ?? '';

  const fullDate = formatted.replace(timeRegex, '');
  return { time, fullDate };
};

/**
 * @param dateString
 * @returns yyyy-MM-dd
 */
export const formatDateToYMD = (dateString: string | Date) => {
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

export const toISOStringWithDate = (
  dateStr: string,
  timeStr: string
): string => {
  const isoString = new Date(`${dateStr}T${timeStr}:00`).toISOString();
  return isoString;
};
