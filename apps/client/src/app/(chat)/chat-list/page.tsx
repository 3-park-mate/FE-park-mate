import ChatPreview from '@/components/pages/chat/ChatPreview';
import { chatPreviewItemDummyData } from '@/data/chatDatas';
import React from 'react';

export default function page() {
  const chatPreviewItems = chatPreviewItemDummyData;
  return (
    <div>
      {chatPreviewItems.map((item, index) => (
        <ChatPreview key={index} chatPreviewItem={item} />
      ))}
    </div>
  );
}
