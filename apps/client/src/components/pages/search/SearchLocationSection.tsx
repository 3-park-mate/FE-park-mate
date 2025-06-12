'use client';

import { SearchLocationResultType } from '@/types/filterInfoType';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { searchLocationByKeywordUtil } from '@/utils/mapUtils';
import { MousePointer2Icon } from 'lucide-react';
import SearchInput from '../search/SearchInput';
import SimpleMapRedirectButton from './MapRedirectButton';
import SearchResultsList from './SearchResultsList';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';

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
      setIsScrolled(false);
      return;
    }
    const fetchSearchResults = async () => {
      const results = await searchLocationByKeywordUtil(inputValue);
      setSearchResults(results);
    };

    fetchSearchResults();
  }, [inputValue]);

  if (loading) {
    return <DotSpinner className="w-full fill-primary size-15 mt-40" />;
  }

  if (error) {
    return <div>카카오맵 로딩 실패</div>;
  }

  return (
    <>
      <section
        className={cn(
          'sticky top-[84px] w-full bg-gray-light-3 px-3 pt-10 pb-8 max-w-[600px] z-40',
          isScrolled && 'shadow-sm'
        )}
      >
        <div className="bg-white w-full py-6 px-5 rounded-2xl">
          <p className="text-xl font-semibold mb-3 mx-1">위치 검색</p>
          <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
        </div>
      </section>
      <section>
        <ul className="px-3 pt-2 pb-10 rounded-xl">
          {inputValue.trim() === '' ? (
            <SimpleMapRedirectButton
              label="근처"
              subText={`현재 내 주변에서\n주차 가능한 주차장을 찾아보세요.`}
              icon={MousePointer2Icon}
              IconclassName="rotate-90 fill-none stroke-primary bg-primary/15"
              className="border-0 bg-white/80"
              position={{ lat: undefined, lng: undefined }}
            />
          ) : (
            <SearchResultsList
              results={searchResults}
              keyword={inputValue}
              setIsScrolled={setIsScrolled}
            />
          )}
        </ul>
      </section>
    </>
  );
}
