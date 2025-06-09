'use client';

import { ChatRoomInfoType } from '@/types/chatDataTypes';
import ChatViewSection from './ChatViewSection';
import ChatSenderSection from './ChatSenderSection';
import { useState } from 'react';

export default function ChatViewer({
  chatRoomInfo,
}: {
  chatRoomInfo: ChatRoomInfoType;
}) {
  const [chatSenderHeight, setChatSenderHeight] = useState<number>(36);
  return (
    <>
      <ChatViewSection
        chatRoomInfo={chatRoomInfo}
        chatSenderHeight={chatSenderHeight}
      />
      <ChatSenderSection setChatSenderHeight={setChatSenderHeight} />
    </>
  );
}
