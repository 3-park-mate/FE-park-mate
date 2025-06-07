'use client';

import { ChatMessageDummyDatas } from '@/data/chatDatas';
import { ChatRoomInfoType } from '@/types/chatDataTypes';
import { useEffect, useRef, useState } from 'react';
import { checkScrollBottomUtil, scrollToBottomUtil } from '@/utils/scrollUtils';
import { getChatDisplayInfoUtil } from '@/utils/getChatDisplayInfoUtils';
import { ScrollToBottomButton } from '@/components/common/ScrollToBottomButton';
import ChatMessageBlock from './ChatMessageBlock';

export default function ChatViewSection({
  chatRoomInfo,
}: {
  chatRoomInfo: ChatRoomInfoType;
}) {
  const chatMessages = ChatMessageDummyDatas;
  const currentUser = 'b1';

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottomUtil(messagesEndRef, false);
    }
  }, []);

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
    <section className="relative">
      <ul className="pb-15">
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
  );
}
