import { ChatPreviewItemType } from '@/types/chatDataTypes';
import { getTimeLabel } from '@/utils/getTimeLabel';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import React from 'react';

export default function ChatPreview({
  chatPreviewItem,
}: {
  chatPreviewItem: ChatPreviewItemType;
}) {
  const {
    chatRoomId,
    profileImage,
    chatRoomName,
    lastMessage,
    updatedAt,
    unReadCount,
    isOnline,
  } = chatPreviewItem;

  const timeLabel = getTimeLabel(updatedAt);

  return (
    <div className="flex justify-between items-center gap-3 py-3.5">
      <div className="relative">
        <Image
          src={profileImage}
          alt={chatRoomName}
          width={48}
          height={48}
          className="rounded-full shrink-0"
        />
        {isOnline && (
          <p className="absolute bottom-0.5 right-0 rounded-full size-[10px] bg-green border-white border-2"></p>
        )}
      </div>
      <>
        <div className="w-full">
          <p className="text-16px text-black font-semibold">{chatRoomName}</p>{' '}
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
    </div>
  );
}
