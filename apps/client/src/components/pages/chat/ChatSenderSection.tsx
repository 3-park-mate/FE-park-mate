'use client';

import { useState } from 'react';
import { Image, Send } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';
import { sendChatMessage } from '@/actions/chat-service';

interface ChatSenderSectionProps {
  setChatSenderHeight: React.Dispatch<React.SetStateAction<number>>;
  chatRoomUuid: string;
}

export default function ChatSenderSection({
  setChatSenderHeight,
  chatRoomUuid,
}: ChatSenderSectionProps) {
  const [message, setMessage] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState<number | undefined>();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;

    sendChatMessage(chatRoomUuid, message, 'text', 'jason');
    setMessage('');
    setTextAreaHeight(undefined);
    setChatSenderHeight(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const value = textarea.value;

    setMessage(value);
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 196);
    textarea.style.height = `${newHeight}px`;
    setTextAreaHeight(newHeight);
    setChatSenderHeight(newHeight);
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSubmit();
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 w-full max-w-[600px] left-1/2 transform -translate-x-1/2 flex items-center gap-2 py-4 px-3 border-t-1 bg-white border-primary/40"
    >
      <textarea
        name="message"
        rows={1}
        placeholder="메시지 입력"
        value={message}
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
        className="w-full relative resize-none rounded-2xl py-2 px-4 mx-10 bg-gray-3/15 placeholder-gray-400 text-sm focus:bg-primary/10 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        style={{
          height: textAreaHeight ? `${textAreaHeight}px` : 'auto',
          maxHeight: '196px',
        }}
      />

      <Image className="absolute bottom-4.5 left-3 size-8 stroke-1 stroke-gray-3 hover:stroke-gray-2 cursor-pointer" />

      <button
        type="submit"
        disabled={!message.trim()}
        className="absolute bottom-4.5 right-2"
      >
        <Send
          className={cn(
            'rounded-full size-8.5 p-1 fill-white stroke-gray-1 bg-gray-1 transition-all duration-200',
            message.trim() &&
              'bg-primary-dark stroke-primary-dark hover:stroke-primary hover:bg-primary cursor-pointer'
          )}
        />
      </button>
    </form>
  );
}
