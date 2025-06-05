'use client';

import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import { ChatPreviewItemType } from '@/types/chatDataTypes';
import { getTimeLabelUtils } from '@/utils/getTimeLabelUtils';
import { useRouter } from 'next/navigation';

export default function ChatPreviewSection({
  chatPreviewItems,
}: {
  chatPreviewItems: ChatPreviewItemType[];
}) {
  const router = useRouter();
  return (
    <ul>
      {chatPreviewItems.map((item, index) => (
        <li
          key={index}
          className="flex justify-between items-center gap-3 py-4"
          onClick={(e) => router.push(`/chat-room/${item.chatRoomId}`)}
        >
          <Image
            src="https://dummyimage.com/45x45"
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
                {getTimeLabelUtils(item.updatedAt)}
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
