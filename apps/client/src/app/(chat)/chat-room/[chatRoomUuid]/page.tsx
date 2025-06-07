import PageHeader from '@/components/layouts/PageHeader';
import ChatSenderSection from '@/components/pages/chat/ChatSenderSection';
import ChatViewSection from '@/components/pages/chat/ChatViewSection';
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
      <main>
        <ChatViewSection chatRoomInfo={chatRoomInfo} />
        <ChatSenderSection />
      </main>
    </>
  );
}
