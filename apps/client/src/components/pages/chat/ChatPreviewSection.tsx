import { ChatPreviewItemType } from '@/types/chatDataTypes';
import { getTimeLabel } from '@/utils/getTimeLabel';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

export default function ChatPreviewSection({
  chatPreviewItem,
}: {
  chatPreviewItem: ChatPreviewItemType;
}) {
  const {
    chatRoomId,
    parkingLotThumbnailUrl,
    chatRoomName,
    lastMessage,
    updatedAt,
    unReadCount,
    isOnline,
  } = chatPreviewItem;

  const timeLabel = getTimeLabel(updatedAt);

  return (
    <section className="flex justify-between items-center gap-3 py-4">
      <div className="relative">
        <Image
          src={parkingLotThumbnailUrl}
          alt={chatRoomName}
          width={48}
          height={48}
          className="rounded-full shrink-0"
        />
        {isOnline && (
          <span className="absolute bottom-0.5 right-0 rounded-full size-[10px] bg-green border-white border-2"></span>
        )}
      </div>
      <>
        <div className="w-full">
          <h2 className="text-16px text-black font-semibold">{chatRoomName}</h2>{' '}
          <p className="text-12px">{lastMessage}</p>
        </div>
        <div className="shrink-0 flex flex-col items-end">
          <p className="text-10px text-gray-3">{timeLabel}</p>
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
    </section>
  );
}
