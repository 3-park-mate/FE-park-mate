import PageHeader from '@/components/layouts/PageHeader';
import ChatViewSection from '@/components/pages/chat/ChatViewSection';
import { ChatRoomInfoDummyData } from '@/data/chatDatas';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

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
      <PaddedLayout>
        <main>
          <ChatViewSection chatRoomInfo={chatRoomInfo} />
        </main>
      </PaddedLayout>
    </>
  );
}
