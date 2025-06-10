'use client';

import { SearchLocationResultType } from '@/types/filterInfoType';
import { Input } from '@repo/ui/components/base/input';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { searchLocationByKeywordUtil } from '@/utils/mapUtils';
import BackButton from '@/components/layouts/BackButton';
import SearchResultsList from './SearchResultsList';

export default function SearchLocationSection() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<
    SearchLocationResultType[]
  >([]);

  useEffect(() => {
    if (loading) return;
    if (inputValue === '') {
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
    return <div>지도 준비 중...</div>;
  }

  if (error) {
    return <div>카카오맵 로딩 실패</div>;
  }

  return (
    <div className="py-3">
      <div className="flex pl-2 pr-8">
        <BackButton className="px-2" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          placeholder="위치를 검색하세요"
          className={cn(
            'border-2 focus-visible:border-black/100 transition-all'
          )}
        />
      </div>

      {searchResults.length > 0 && (
        <SearchResultsList results={searchResults} />
      )}
    </div>
  );
}
