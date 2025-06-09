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
  chatSenderHeight = 0, // 기본값 설정
}: {
  chatRoomInfo: ChatRoomInfoType;
  chatSenderHeight?: number; // 선택적 prop으로 기본값 설정
}) {
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>(
    ChatMessageDummyDatas
  );
  const currentUser = 'b1';

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [refPosition, setRefPosition] = useState<number>(0);

  useEffect(() => {
    console.log('chatSenderHeight:', chatSenderHeight);
    setRefPosition(chatSenderHeight);
  }, [chatSenderHeight]);

  const getChatMessages = async () => {
    // 실제 API 호출 로직을 여기에 추가
    // 예시로 더미 데이터를 사용
    const event = new EventSource(
      `http://localhost:9000/api/v1/chat/reactive/new/1`
    );
    event.onmessage = (e) => {
      const newMessage: ChatMessageType = JSON.parse(e.data);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottomUtil(messagesEndRef, true);
    };
    event.onerror = (error) => {
      console.error('Error receiving chat messages:', error);
      event.close();
    };
  };

  // 메시지 도착 로직 추가

  useEffect(() => {
    if (messagesEndRef.current) {
      scrollToBottomUtil(messagesEndRef, true);
    }
  }, [chatMessages, chatSenderHeight]);

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

  useEffect(() => {
    getChatMessages();
    return () => {
      // 컴포넌트 언마운트 시 EventSource 닫기
      const eventSource = new EventSource(
        `http://localhost:9000/api/v1/chat/reactive/new/1`
      );
      eventSource.close();
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
        </ul>
        <div style={{ height: `${refPosition}px` }} />
        <div ref={messagesEndRef} />
        <ScrollToBottomButton show={isScrolled} targetRef={messagesEndRef} />
      </section>
    )
  );
}
