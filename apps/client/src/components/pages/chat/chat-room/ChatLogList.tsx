import { ChatMessageType, ChatRoomInfoType } from '@/types/chatDataTypes';
import ChatMessageBlock from './ChatMessageBlock';

export default function ChatLogList({
  chatRoomInfo,
  chatMessages,
  currentUser,
}: {
  chatRoomInfo: ChatRoomInfoType;
  chatMessages: ChatMessageType[];
  currentUser: string;
}) {
  return (
    <ul className="px-6">
      {chatMessages.map((message, index) => {
        const prevMessage = chatMessages[index - 1];

        return (
          <ChatMessageBlock
            key={index}
            prevMessage={prevMessage}
            currentMessage={message}
            currentUser={currentUser}
            chatRoomInfo={chatRoomInfo}
          />
        );
      })}
    </ul>
  );
}
