import ChatMessage from './ChatMessage';
import { TextWithImage } from '@/components/common/TextWithImage';
import { TextBadge } from '@repo/ui/components/common/CommonLayouts';
import { chatMessageBlockInfoType } from '@/types/chatDataTypes';
import { getChatDisplayInfoUtil } from '@/utils/getChatDisplayInfoUtils';

export default function ChatMessageBlock({
  prevMessage,
  currentMessage,
  currentUser,
  chatRoomInfo,
}: chatMessageBlockInfoType) {
  const displayInfo = getChatDisplayInfoUtil({
    prevMessage,
    currentMessage,
    currentUser,
    chatRoomInfo,
  });
  return (
    <li>
      {displayInfo.showDate && <TextBadge>{displayInfo.date}</TextBadge>}
      {displayInfo.showProfile && (
        <TextWithImage
          imageProps={{
            src: displayInfo.senderProfile?.profileImageUrl || '',
            alt: displayInfo.senderProfile?.userNickName || '',
          }}
        >
          {displayInfo.senderProfile?.userNickName}
        </TextWithImage>
      )}
      <ChatMessage
        message={currentMessage.message}
        messageType={currentMessage.messageType}
        time={displayInfo.time}
        isFromMe={displayInfo.isFromMe}
      />
    </li>
  );
}
