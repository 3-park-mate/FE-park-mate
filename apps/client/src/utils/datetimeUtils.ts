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
 * 두 ISO 날짜 문자열의 차이를 "X시간 Y분" 형식으로 반환합니다.
 * 분이 0이면 "X시간"만, 시간이 0이면 "Y분"만 반환합니다.
 */
export const formatDuration = (startIso: string, endIso: string) => {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) return '0분';

  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  if (hours > 0) {
    return `${hours}시간`;
  }
  return `${minutes}분`;
};
/**
 * combineDateAndTime 함수는 날짜(Date)와 시간 문자열("HH:mm" 형식)을
 * 합쳐서 하나의 Date 객체로 만들어주는 함수입니다.
 */
export const combineDateAndTime = (date: Date, time: string): Date | null => {
  const [hoursStr, minutesStr] = time.split(':');
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  if (isNaN(hours) || isNaN(minutes)) return null;

  const result = new Date(date);
  result.setHours(hours);
  result.setMinutes(minutes);
  result.setSeconds(0);
  result.setMilliseconds(0);
  return result;
};

/**
 * 주어진 Date 객체를 로컬 시간 기준 ISO 8601 형식(YYYY-MM-DDTHH:mm:ss) 문자열로 변환합니다.
 * UTC 변환 없이 사용자의 로컬 시간대를 그대로 반영합니다.
 *
 * @param date - 변환할 Date 객체
 * @returns 로컬 시간 기준 ISO 문자열
 */
export const toLocalISOString = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
};
