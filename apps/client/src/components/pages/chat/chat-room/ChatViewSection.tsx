'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatMessageDummyDatas } from '@/data/chatDatas';
import { ChatMessageType, ChatRoomInfoType } from '@/types/chatDataTypes';
import { checkScrollBottomUtil, scrollToBottomUtil } from '@/utils/scrollUtils';
import { ScrollToBottomButton } from '@/components/common/ScrollToBottomButton';
import ChatLogList from './ChatLogList';

export default function ChatViewSection({
  chatRoomInfo,
  chatSenderHeight,
}: {
  chatRoomInfo: ChatRoomInfoType;
  chatSenderHeight: number;
}) {
  const currentUser = 'b1';
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>(
    ChatMessageDummyDatas
  );

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottomUtil(messagesEndRef, false);
    }
  }, [chatMessages, isScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      checkScrollBottomUtil({
        onChange: (isAtBottom) => setIsScrolled(!isAtBottom),
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return chatMessages.length > 0 ? (
    <section className="relative">
      <ChatLogList
        chatMessages={chatMessages}
        chatRoomInfo={chatRoomInfo}
        currentUser={currentUser}
      />
      <div ref={messagesEndRef} />
      <ScrollToBottomButton
        show={isScrolled}
        targetRef={messagesEndRef}
        marginBottom={chatSenderHeight}
      />
    </section>
  ) : (
    <div className="h-full py-30 flex justify-center items-center">
      채팅을 시작해보세요.
    </div>
  );
}
