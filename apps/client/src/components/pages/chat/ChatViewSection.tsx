import { TextWithImage } from '@/components/common/TextWithImage';
import { ChatMessageDummyDatas } from '@/data/chatDatas';
import { ChatRoomInfoType } from '@/types/chatDataTypes';
import ChatMessage from './ChatMessage';

export default function ChatViewSection({
  chatRoomInfo,
}: {
  chatRoomInfo: ChatRoomInfoType;
}) {
  const chatMessages = ChatMessageDummyDatas;
  const currentUserUuid = 'b1';

  return (
    <ul>
      {chatMessages.map((item, index) => (
        <li key={index}>
          <TextWithImage
            imageProps={{
              src:
                item.senderUuid === chatRoomInfo.userUuid
                  ? chatRoomInfo.userProfileUrl
                  : chatRoomInfo.parkingLotThumbnailUrl,
              alt:
                item.senderUuid === chatRoomInfo.userUuid
                  ? chatRoomInfo.userNickname
                  : chatRoomInfo.hostNickname,
            }}
            right={item.senderUuid === currentUserUuid}
          >
            {item.senderUuid === chatRoomInfo.userUuid
              ? chatRoomInfo.userNickname
              : chatRoomInfo.hostNickname}
          </TextWithImage>
          <ChatMessage
            message={item?.message || ''}
            senderUuid={item?.senderUuid || ''}
            currentUserUuid={currentUserUuid}
            createdAt={item?.createdAt}
          />
        </li>
      ))}
    </ul>
  );
}
