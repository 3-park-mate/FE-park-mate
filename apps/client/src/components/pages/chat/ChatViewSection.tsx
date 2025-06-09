'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatMessageDummyDatas } from '@/data/chatDatas';
import { ChatMessageType, ChatRoomInfoType } from '@/types/chatDataTypes';
import { checkScrollBottomUtil, scrollToBottomUtil } from '@/utils/scrollUtils';
import { getChatDisplayInfoUtil } from '@/utils/getChatDisplayInfoUtils';
import { ScrollToBottomButton } from '@/components/common/ScrollToBottomButton';
import ChatMessageBlock from './ChatMessageBlock';

export default function ChatViewSection({
  chatRoomInfo,
}: {
  chatRoomInfo: ChatRoomInfoType;
}) {
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>(
    ChatMessageDummyDatas
  );
  const currentUser = 'b1';

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  // 메시지 도착 로직 추가

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottomUtil(messagesEndRef, false);
    }
  }, [chatMessages]);

  useEffect(() => {
    const handleScroll = () => {
      checkScrollBottomUtil({
        onChange: (isAtBottom) => setIsScrolled(!isAtBottom),
      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    chatMessages && (
      <section className="relative mb-20">
        <ul className="px-6">
          {chatMessages.map((message, index) => {
            const prevMessage = chatMessages[index - 1];
            const displayInfo = getChatDisplayInfoUtil({
              prevMessage,
              message,
              currentUser,
              chatRoomInfo,
            });

            return (
              <li key={index}>
                <ChatMessageBlock
                  displayInfo={displayInfo}
                  message={message.message}
                  messageType={message.messageType}
                  createdAt={message.createdAt}
                />
              </li>
            );
          })}
          <div ref={messagesEndRef} />
        </ul>
        <ScrollToBottomButton show={isScrolled} targetRef={messagesEndRef} />
      </section>
    )
  );
}
