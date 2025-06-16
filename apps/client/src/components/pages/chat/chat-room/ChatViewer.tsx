'use client';

import { ChatRoomInfoType } from '@/types/chatDataTypes';
import ChatViewSection from './ChatViewSection';
import ChatSenderSection from './ChatSenderSection';
import { useEffect, useRef, useState } from 'react';

export default function ChatViewer({
  chatRoomInfo,
}: {
  chatRoomInfo: ChatRoomInfoType;
}) {
  const [chatSenderHeight, setChatSenderHeight] = useState<number>(36);
  const prevHeightRef = useRef(chatSenderHeight);

  useEffect(() => {
    const heightDiff = chatSenderHeight - prevHeightRef.current;

    if (heightDiff !== 0) {
      window.scrollBy({ top: heightDiff, behavior: 'smooth' });

      prevHeightRef.current = chatSenderHeight;
    }
  }, [chatSenderHeight]);

  return (
    <main style={{ paddingBottom: `${chatSenderHeight + 36}px` }}>
      <ChatViewSection
        chatRoomInfo={chatRoomInfo}
        chatSenderHeight={chatSenderHeight}
      />
      <ChatSenderSection setChatSenderHeight={setChatSenderHeight} />
    </main>
  );
}
