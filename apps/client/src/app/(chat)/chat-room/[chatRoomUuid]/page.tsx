import PageHeader from '@/components/layouts/PageHeader';
import ChatViewer from '@/components/pages/chat/ChatViewer';
import { ChatRoomInfoDummyData } from '@/data/chatDatas';
import { Suspense } from 'react';

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
        <Suspense fallback={<div>Loading chat...</div>}>
          <ChatViewer chatRoomInfo={chatRoomInfo} chatRoomUuid={chatRoomUuid} />
        </Suspense>
      </main>
    </>
  );
}
