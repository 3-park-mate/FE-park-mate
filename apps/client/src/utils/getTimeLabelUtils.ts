export function getTimeLabelUtils(updatedAt: string): string {
  const updated = new Date(updatedAt);
  const today = new Date();

  const updatedDate = new Date(
    updated.getFullYear(),
    updated.getMonth(),
    updated.getDate()
  );
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffDate =
    (todayDate.getTime() - updatedDate.getTime()) / (60 * 60 * 24 * 1000);

  if (diffDate === 0) {
    const hour24 = updated.getHours();
    const hour12 = hour24 % 12 || 12;
    const minute = updated.getMinutes().toString().padStart(2, '0');
    const period = hour24 < 12 ? '오전' : '오후';
    return `${period} ${hour12}:${minute}`;
  }

  if (diffDate === 1) return '어제';

  if (updated.getFullYear() === today.getFullYear()) {
    return `${updated.getMonth() + 1}월 ${updated.getDate()}일`;
  }

  return `${updated.getFullYear()}. ${updated.getMonth() + 1}. ${updated.getDate()}`;
}
