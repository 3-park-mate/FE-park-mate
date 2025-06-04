import { cn } from '@repo/ui/lib/utils';

export default function ChatMessage({
  message,
  senderUuid,
  currentUserUuid,
  createdAt = '',
}: {
  message: string;
  senderUuid: string;
  currentUserUuid: string;
  createdAt?: string;
}) {
  const date = new Date(createdAt);

  const fromMe = senderUuid === currentUserUuid;
  return (
    <>
      <div
        className={cn(
          'w-full flex flex-col mb-1',
          fromMe ? 'items-end' : 'items-start'
        )}
      >
        <p
          className={cn(
            'inline-flex px-3 py-2 border-1 rounded-b-xl rounded-tr-xl text-sm',
            fromMe &&
              'bg-primary-dark-50 text-sm text-white rounded-tl-xl rounded-tr-none '
          )}
        >
          {message}
        </p>
        {createdAt && (
          <p className="text-gray-3 text-xs mt-1.5">
            {Intl.DateTimeFormat('en-EN', {
              hour: '2-digit',
              minute: '2-digit',
            }).format(date)}
          </p>
        )}
      </div>
    </>
  );
}
