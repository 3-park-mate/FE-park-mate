import ChatPreview from '@/components/pages/chat/ChatPreview';
import { chatPreviewItemDummyData } from '@/data/chatDatas';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import React from 'react';

export default function page() {
  return (
    <div>
      <ChatPreview chatPreviewItem={chatPreviewItemDummyData} />
    </div>
  );
}
