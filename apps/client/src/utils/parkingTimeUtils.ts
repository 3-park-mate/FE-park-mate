export function calculateProgress(
  entryTimeStr: string,
  exitTimeStr: string
): number {
  const entry = new Date(entryTimeStr).getTime();
  const exit = new Date(exitTimeStr).getTime();
  const now = Date.now();

  if (now >= exit) return 100;
  if (now <= entry) return 0;

  const total = exit - entry;
  const used = now - entry;

  return Math.floor((used / total) * 100);
}

export function formatRemainingTime(exitTimeStr: string): string {
  const now = Date.now();
  const exit = new Date(exitTimeStr).getTime();
  const diff = exit - now;

  if (diff <= 0) return '시간이 초과되었습니다.';

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours > 0 ? `${hours}시간 ` : ''}${mins}분 남음`;
}
