import ChatMessage from './ChatMessage';
import { TextWithImage } from '@/components/common/TextWithImage';
import { TextBadge } from '@repo/ui/components/common/CommonLayouts';
import { chatMessageBlockInfoType } from '@/types/chatDataTypes';

export default function ChatMessageBlock({
  displayInfo,
  message,
  createdAt,
}: chatMessageBlockInfoType) {
  return (
    <>
      {displayInfo.showDate && <TextBadge>{displayInfo.dateOnly}</TextBadge>}
      {displayInfo.showProfile && (
        <TextWithImage
          imageProps={{
            src: 'https://dummyimage.com/45x45',
            alt: displayInfo.senderProfile?.userNickName || '',
          }}
        >
          {displayInfo.senderProfile?.userNickName}
        </TextWithImage>
      )}
      <ChatMessage
        message={message}
        createdAt={createdAt}
        isFromMe={displayInfo.isFromMe}
      />
    </>
  );
}
