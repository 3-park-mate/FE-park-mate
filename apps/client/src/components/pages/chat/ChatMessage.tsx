import ImageViewDialog from '@/components/common/ImageViewDialog';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

export default function ChatMessage({
  message,
  messageType,
  time,
  isFromMe,
}: {
  message: string;
  messageType: string;
  time: string;
  isFromMe: boolean;
}) {
  return (
    <div
      className={cn(
        'w-full flex flex-col space-y-1 mb-2',
        isFromMe ? 'items-end' : 'items-start'
      )}
    >
      {messageType === 'text' ? (
        <p
          className={cn(
            'inline-flex max-w-5/6 break-all bg-white px-3 py-2 border-1 border-gray-light-2 rounded-b-xl rounded-tr-xl text-sm font-medium',
            isFromMe &&
              'bg-primary-dark-50 text-white font-light border-0 rounded-tl-xl rounded-tr-none '
          )}
        >
          {message}
        </p>
      ) : (
        <>
          <ImageViewDialog imgSrc={message} title="">
            <Image
              className="rounded-lg"
              src={message}
              alt={message}
              width={200}
              height={150}
            />
          </ImageViewDialog>
        </>
      )}
      <p className="text-gray-3 text-xs">{time}</p>
    </div>
  );
}
