'use client';
import { Input } from '@repo/ui/components/base/input';
import { cn } from '@repo/ui/lib/utils';
import { SearchIcon } from 'lucide-react';

export default function SearchInput({
  inputValue,
  setInputValue,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative w-full h-[52px] my-10">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        placeholder="위치를 검색하세요"
        className={cn(
          'peer absolute top-0 w-full h-full pl-10 border-0 placeholder:text-gray-2 bg-gray-1/80 focus:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary transition-all'
        )}
      />
      <SearchIcon className="absolute top-0 size-5.5 h-full mx-3 stroke-gray-2 peer-focus:stroke-primary-dark-50 transition-colors" />
    </div>
  );
}
