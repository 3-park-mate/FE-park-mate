'use client';

import { useState } from 'react';
import { Image, Send } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

export default function ChatSenderSection() {
  const [defaultMessage, setDefaultMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDefaultMessage(event.target.value);
    autoResizeTextarea(event);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (defaultMessage === '') return;
    e?.preventDefault();

    console.log('submit:', defaultMessage);
    // 메시지 전송 로직 추가
    setDefaultMessage('');
  };

  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = 'auto';
    if (textarea.scrollHeight < 196) {
      textarea.style.height = textarea.scrollHeight + 'px';
    } else {
      textarea.style.height = '196px';
    }
    console.log(textarea.scrollHeight);
  };

  return (
    <form
      className="fixed bottom-0 w-full max-w-[600px] left-1/2 transform -translate-x-1/2 flex items-center gap-2 py-4 px-3 border-t-1 bg-white border-primary/40"
      onSubmit={handleSubmit}
    >
      <textarea
        rows={1}
        name="message"
        onChange={handleChange}
        value={defaultMessage}
        maxLength={300}
        placeholder="메시지 입력"
        className="w-full relative resize-none rounded-2xl py-2 px-4 mx-10 bg-gray-3/15 placeholder-gray-400 text-sm focus:bg-primary/10 focus:outline-none focus:ring-1 focus:ring-primary transition-all "
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <Image className="absolute bottom-4.5 left-3 size-8 stroke-1 stroke-gray-3 hover:stroke-gray-2" />
      <button
        type="submit"
        disabled={!defaultMessage}
        className="absolute bottom-4.5 right-2"
      >
        <Send
          className={cn(
            'rounded-full size-8.5 p-1 fill-white stroke-gray-1 bg-gray-1 transition-all duration-200',
            defaultMessage &&
              'bg-primary-dark stroke-primary-dark  hover:stroke-primary hover:bg-primary'
          )}
        />
      </button>
    </form>
  );
}
