import PageHeader from '@/components/layouts/PageHeader';
import ChatViewer from '@/components/pages/chat/chat-room/ChatViewer';
import { ChatRoomInfoDummyData } from '@/data/chatDatas';

export default async function page({
  params,
}: {
  params: Promise<{ chatRoomUuid: string }>;
}) {
  const { chatRoomUuid } = await params;
  const chatRoomInfo = ChatRoomInfoDummyData;

  return (
    <>
      <PageHeader
        title={chatRoomInfo.chatRoomName}
        className="bg-gray-light-1"
      />
      <ChatViewer chatRoomInfo={chatRoomInfo} />
    </>
  );
}
