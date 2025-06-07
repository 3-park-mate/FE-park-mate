import ChatMessage from './ChatMessage';
import { TextWithImage } from '@/components/common/TextWithImage';
import { TextBadge } from '@repo/ui/components/common/CommonLayouts';
import { chatMessageBlockInfoType } from '@/types/chatDataTypes';

export default function ChatMessageBlock({
  displayInfo,
  messageType,
  message,
  createdAt,
}: chatMessageBlockInfoType) {
  return (
    <>
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
        message={message}
        messageType={messageType}
        time={displayInfo.time}
        isFromMe={displayInfo.isFromMe}
      />
    </>
  );
}
