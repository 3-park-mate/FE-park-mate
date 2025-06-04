import { chatPreviewItemDummyData } from '@/data/chatDatas';
import ChatPreviewSection from '@/components/pages/chat/ChatPreviewSection';

export default function page() {
  const chatPreviewItems = chatPreviewItemDummyData;
  return (
    <main>
      <ChatPreviewSection chatPreviewItems={chatPreviewItems} />
    </main>
  );
}
