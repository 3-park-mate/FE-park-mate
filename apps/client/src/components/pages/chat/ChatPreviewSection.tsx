import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import { ChatPreviewItemType } from '@/types/chatDataTypes';
import { getTimeLabel } from '@/utils/getTimeLabel';

export default function ChatPreviewSection({
  chatPreviewItems,
}: {
  chatPreviewItems: ChatPreviewItemType[];
}) {
  return (
    <ul>
      {chatPreviewItems.map((item, index) => (
        <li
          key={index}
          className="flex justify-between items-center gap-3 py-4"
        >
          <Image
            src={item.parkingLotThumbnailUrl}
            alt={item.chatRoomName}
            width={48}
            height={48}
            className="rounded-full shrink-0"
          />
          <>
            <div className="w-full">
              <h2 className="text-16px text-black font-semibold">
                {item.chatRoomName}
              </h2>
              <p className="text-12px">{item.lastMessage}</p>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <p className="text-10px text-gray-3">
                {getTimeLabel(item.updatedAt)}
              </p>
              <p
                className={cn(
                  'bg-red-2 font-semibold text-xs text-white size-[22px] rounded-[8px] flex items-center justify-center',
                  item.unReadCount === 0 && 'opacity-0'
                )}
              >
                {item.unReadCount}
              </p>
            </div>
          </>
        </li>
      ))}
    </ul>
  );
}
