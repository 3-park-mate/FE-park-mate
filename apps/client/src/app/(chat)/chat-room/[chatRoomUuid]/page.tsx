import PageHeader from '@/components/layouts/PageHeader';
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
      <main className="z-0 px-6">
        <ChatViewSection chatRoomInfo={chatRoomInfo} />
      </main>
    </>
  );
}
