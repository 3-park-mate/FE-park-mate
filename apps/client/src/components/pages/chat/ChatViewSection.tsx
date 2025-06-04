import { TextWithImage } from '@/components/common/TextWithImage';
import { ChatMessageDummyDatas } from '@/data/chatDatas';
import { ChatRoomInfoType } from '@/types/chatDataTypes';

export default function ChatViewSection({
  chatRoomInfo,
}: {
  chatRoomInfo: ChatRoomInfoType;
}) {
  const chatMessages = ChatMessageDummyDatas;
  const chatMessage = chatMessages[0];
  const date = new Date(chatMessage?.createdAt ?? '');
  return (
    <div>
      <TextWithImage
        imageProps={{
          src: chatRoomInfo.parkingLotThumbnailUrl || '',
          alt: chatRoomInfo.hostNickname,
        }}
      >
        {chatRoomInfo.hostNickname}
      </TextWithImage>
      <p className="inline-flex px-3 py-2 border-1 rounded-b-xl rounded-tr-xl text-14px">
        {chatMessage?.message}
      </p>
      <p className="text-gray-3 text-xs mt-1.5">
        {Intl.DateTimeFormat('en-EN', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(date)}
      </p>
    </div>
  );
}
