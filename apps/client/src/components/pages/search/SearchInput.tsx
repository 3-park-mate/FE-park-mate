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
    <div className="relative w-full h-[50px]">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        placeholder="위치를 검색하세요"
        className={cn(
          'peer absolute top-0 w-full h-full pl-10 border-1 border-gray-3 bg-white placeholder:text-gray-2 focus:bg-primary/10 focus:border-none focus:ring-1 focus:ring-primary transition-all'
        )}
      />
      <SearchIcon className="absolute top-0 size-5.5 h-full mx-3 stroke-gray-2 peer-focus:stroke-primary-dark-50 transition-colors" />
    </div>
  );
}
