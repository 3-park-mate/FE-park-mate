import { chatPreviewItemDummyData } from '@/data/chatDatas';
import ChatPreviewSection from '@/components/pages/chat/chat-list/ChatPreviewSection';

export default function page() {
  const chatPreviewItems = chatPreviewItemDummyData;
  return (
    <main>
      <ChatPreviewSection chatPreviewItems={chatPreviewItems} />
    </main>
  );
}
