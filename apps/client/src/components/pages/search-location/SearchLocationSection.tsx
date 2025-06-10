'use client';

import { SearchLocationResultType } from '@/types/filterInfoType';
import { Input } from '@repo/ui/components/base/input';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { searchLocationByKeywordUtil } from '@/utils/mapUtils';
import SearchResultsList from './SearchResultsList';
import SearchIcon from '@repo/ui/components/icon/SearchIcon';
import { MousePointer2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CancelButton from '@/components/layouts/CancelButton';

export default function SearchLocationSection() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<
    SearchLocationResultType[]
  >([]);

  useEffect(() => {
    if (loading) return;
    if (inputValue.trim() === '') {
      setSearchResults([]);
      return;
    }
    const fetchSearchResults = async () => {
      const results = await searchLocationByKeywordUtil(inputValue);
      setSearchResults(results);
    };

    fetchSearchResults();
  }, [inputValue]);

  if (loading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>카카오맵 로딩 실패</div>;
  }

  return (
    <>
      <section
        className={cn(
          'fixed top-0 bg-gray-light-3 w-full pl-6 pr-5 max-w-[600px] z-50 flex items-center gap-4 ',
          isScrolled && 'shadow-sm'
        )}
      >
        <div className="relative w-full h-[52px] my-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            placeholder="위치를 검색하세요"
            className={cn(
              'peer absolute top-0 w-full h-full pl-10 border-0 placeholder:text-gray-2 bg-gray-1/80 focus:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary transition-all'
            )}
          />
          <SearchIcon className="absolute top-0 size-5.5 h-full mx-3 stroke-gray-2 peer-focus:stroke-primary-dark-50 transition-colors z-50 " />
        </div>
        <CancelButton />
      </section>
      <section className="px-6 pt-25">
        {!inputValue.trim() && (
          <button
            type="button"
            className="flex w-full items-center gap-3 bg-white border-1 rounded-lg py-3 px-4 cursor-pointer"
            onClick={() => router.replace('/map')}
          >
            <MousePointer2Icon className="rotate-90 fill-primary stroke-primary" />
            <p className="text-lg py-1">Nearby</p>
          </button>
        )}
        {searchResults.length > 0 && (
          <SearchResultsList
            results={searchResults}
            keyword={inputValue}
            setIsScrolled={setIsScrolled}
          />
        )}
      </section>
    </>
  );
}
