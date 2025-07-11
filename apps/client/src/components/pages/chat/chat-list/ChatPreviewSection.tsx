'use client';

import { ChatPreviewItemType } from '@/types/chatDataTypes';
import ChatPreviewCard from './ChatPreviewCard';

export default function ChatPreviewSection({
  chatPreviewItems,
}: {
  chatPreviewItems: ChatPreviewItemType[];
}) {
  return (
    <ul>
      {chatPreviewItems.map((item, index) => (
        <li key={index}>
          <ChatPreviewCard
            chatRoomId={item.chatRoomId}
            chatRoomName={item.chatRoomName}
            lastMessage={item.lastMessage}
            updatedAt={item.updatedAt}
            unReadCount={item.unReadCount}
          />
        </li>
      ))}
    </ul>
  );
}
