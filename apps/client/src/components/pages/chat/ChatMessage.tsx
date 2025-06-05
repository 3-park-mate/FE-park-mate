import { formatTimeENUtils } from '@/utils/datetimeUtils';
import { cn } from '@repo/ui/lib/utils';

export default function ChatMessage({
  message,
  createdAt = '',
  isFromMe,
}: {
  message: string;
  createdAt?: string;
  isFromMe: boolean;
}) {
  const formattedTime = formatTimeENUtils(createdAt);

  return (
    <div
      className={cn(
        'w-full flex flex-col space-y-1 mb-2',
        isFromMe ? 'items-end' : 'items-start'
      )}
    >
      <p
        className={cn(
          'inline-flex max-w-5/6 break-all bg-white px-3 py-2 border-1 border-gray-light-2 rounded-b-xl rounded-tr-xl text-sm font-medium',
          isFromMe &&
            'bg-primary-dark-50 text-white font-light border-0 rounded-tl-xl rounded-tr-none '
        )}
      >
        {message}
      </p>
      <p className="text-gray-3 text-xs">{formattedTime}</p>
    </div>
  );
}
