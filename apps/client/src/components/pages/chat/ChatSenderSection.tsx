'use client';
import { Image, Send, Smile } from 'lucide-react';
import { useState } from 'react';

export default function ChatSenderSection() {
  const [defaultMessage, setDefaultMessage] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDefaultMessage(event.target.value);
  };
  return (
    <form className="fixed bottom-0 w-full max-w-[600px] left-1/2 transform -translate-x-1/2 flex items-center gap-2 py-4 px-3 border-t-1 bg-white  border-primary/40">
      <Image className="size-7.5 stroke-1.5 stroke-gray-3" />
      <textarea
        name="messge"
        onChange={handleChange}
        value={defaultMessage}
        placeholder="메시지 입력"
        className="w-full h-9 resize-none rounded-full py-2 px-4 bg-primary/10 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
      />
      <button
        type="submit"
        className="p-1 rounded-full bg-primary-dark hover:bg-primary shadow-md cursor-pointer"
      >
        <Send className="size-6 fill-white stroke-primary-dark hover:stroke-primary" />
      </button>
    </form>
  );
}
