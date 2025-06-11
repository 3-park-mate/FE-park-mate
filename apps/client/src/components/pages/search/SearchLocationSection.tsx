'use client';

import { SearchLocationResultType } from '@/types/filterInfoType';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { searchLocationByKeywordUtil } from '@/utils/mapUtils';
import { MousePointer2Icon } from 'lucide-react';
import SearchInput from '../search/SearchInput';
import SimpleMapRedirectButton from '../search/SimpleMapRedirectButton';
import SearchResultsList from './SearchResultsList';

export default function SearchLocationSection() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

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
          'fixed top-20  w-full pl-6 pr-5 max-w-[600px] bg-gray-light-3 z-40 flex items-center gap-3',
          isScrolled && 'shadow-sm'
        )}
      >
        <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
      </section>
      <section className="px-5.5 pt-55 pb-20">
        {!inputValue.trim() && (
          <SimpleMapRedirectButton
            label="Nearby"
            icon={MousePointer2Icon}
            className="rotate-90 fill-primary stroke-primary size-7"
          />
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
