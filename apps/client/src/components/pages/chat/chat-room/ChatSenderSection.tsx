'use client';

import { useRef, useState } from 'react';
import { Image, Send } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

export default function ChatSenderSection({
  setChatSenderHeight,
}: {
  setChatSenderHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [defaultMessage, setDefaultMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (defaultMessage === '') return;
    e?.preventDefault();
    setDefaultMessage('');
    console.log('submit:', defaultMessage);
    // 메시지 전송 로직 추가
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setChatSenderHeight(36);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    setDefaultMessage(textarea.value);
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 196);
    textarea.style.height = `${newHeight}px`;
    setChatSenderHeight(newHeight);
  };

  return (
    <form
      className="fixed bottom-0 w-full max-w-[600px] left-1/2 transform -translate-x-1/2 flex items-center gap-2 py-4 px-3 border-t-1 bg-white border-primary/40"
      onSubmit={handleSubmit}
    >
      <textarea
        ref={textareaRef}
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
      <Image className="absolute bottom-4.5 left-3 size-8 stroke-1 stroke-gray-3 hover:stroke-gray-2 cursor-pointer" />
      <button
        type="submit"
        disabled={!defaultMessage}
        className="absolute bottom-4.5 right-2"
      >
        <Send
          className={cn(
            'rounded-full size-8.5 p-1 fill-white stroke-gray-1 bg-gray-1 transition-all duration-200',
            defaultMessage &&
              'bg-primary-dark stroke-primary-dark  hover:stroke-primary hover:bg-primary cursor-pointer'
          )}
        />
      </button>
    </form>
  );
}
