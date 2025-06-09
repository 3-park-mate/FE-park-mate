'use client';

import React, { useState } from 'react';
import ChatViewSection from './ChatViewSection';
import ChatSenderSection from './ChatSenderSection';
import { ChatRoomInfoType } from '@/types/chatDataTypes';

interface ChatViewerProps {
  chatRoomInfo: ChatRoomInfoType;
  chatRoomUuid: string;
}

export default function ChatViewer({
  chatRoomInfo,
  chatRoomUuid,
}: ChatViewerProps) {
  const [chatSenderHeight, setChatSenderHeight] = useState<number>(50);

  return (
    <>
      <ChatViewSection
        chatRoomInfo={chatRoomInfo}
        chatSenderHeight={chatSenderHeight}
      />
      <ChatSenderSection
        chatRoomUuid={chatRoomUuid}
        setChatSenderHeight={setChatSenderHeight}
      />
    </>
  );
}
