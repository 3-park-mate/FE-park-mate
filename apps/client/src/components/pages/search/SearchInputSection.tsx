import { cn } from '@repo/ui/lib/utils';
import SearchInput from './SearchInput';

export default function SearchInputSection({
  inputValue,
  setInputValue,
  isScrolled = false,
  type = 'location',
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isScrolled?: boolean;
  type?: 'location' | 'parking';
}) {
  return (
    <section
      className={cn(
        'sticky top-[84px] w-full bg-gray-light-3 px-3 pt-10 pb-8 max-w-[600px] z-40',
        isScrolled && 'shadow-sm'
      )}
    >
      <div className="bg-white w-full py-6 px-5 rounded-2xl">
        <p className="text-xl font-semibold mb-3 mx-1">
          {type === 'location' ? '위치 검색' : '주차장 검색'}
        </p>
        <SearchInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          type={type}
        />
      </div>
    </section>
  );
}
