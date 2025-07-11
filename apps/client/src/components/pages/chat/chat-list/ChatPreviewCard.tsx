import { ChatPreviewItemType } from '@/types/chatDataTypes';
import { getTimeLabelUtils } from '@/utils/getTimeLabelUtils';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function ChatPreviewCard({
  chatRoomId,
  chatRoomName,
  lastMessage,
  updatedAt,
  unReadCount,
}: ChatPreviewItemType) {
  return (
    <Link
      href={`/chat-room/${chatRoomId}`}
      className="flex justify-between items-center gap-3 py-4 cursor-pointer"
    >
      <Image
        src="https://dummyimage.com/45x45"
        alt={chatRoomName}
        width={48}
        height={48}
        className="rounded-full shrink-0"
      />
      <>
        <div className="w-full">
          <h2 className="text-16px text-black font-semibold">{chatRoomName}</h2>
          <p className="text-12px">{lastMessage}</p>
        </div>
        <div className="shrink-0 flex flex-col items-end">
          <p className="text-10px text-gray-3">
            {getTimeLabelUtils(updatedAt)}
          </p>
          <p
            className={cn(
              'bg-red-2 font-semibold text-xs text-white size-[22px] rounded-[8px] flex items-center justify-center',
              unReadCount === 0 && 'opacity-0'
            )}
          >
            {unReadCount}
          </p>
        </div>
      </>
    </Link>
  );
}
