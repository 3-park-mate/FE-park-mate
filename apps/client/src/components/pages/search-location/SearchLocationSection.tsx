'use client';

import { SearchLocationResultType } from '@/types/filterInfoType';
import { Input } from '@repo/ui/components/base/input';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import SearchResultsList from './SearchResultsList';
import BackButton from '@/components/layouts/BackButton';

export default function SearchLocationSection() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services'],
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

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(inputValue, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let results = [];
        for (var i = 0; i < data.length; i++) {
          results.push({
            position: {
              lat: parseFloat(data[i]?.y || ''),
              lng: parseFloat(data[i]?.x || ''),
            },
            content: data[i]?.place_name || '',
            road_address_name: data[i]?.road_address_name || '',
          });
        }
        setSearchResults(results);
      }
    });
  }, [inputValue]);

  if (loading) {
    console.log('카카오맵 로딩중:');
  }

  if (error) {
    console.log('카카오맵 로딩 실패:', error.message);
    return;
  }

  return (
    <div className="py-3">
      <div className="flex pl-2 pr-8">
        <BackButton className="px-2" />
        <Input
          value={inputValue}
          // onBlur={() => setInputValue('')}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          placeholder="위치를 검색하세요"
          className={cn(
            'border-2 focus-visible:border-black/100 transition-all'
          )}
        />
      </div>

      {searchResults.length > 0 && (
        <SearchResultsList
          searchResults={searchResults}
          setInputValue={setInputValue}
          setSearchResults={setSearchResults}
        />
      )}
    </div>
  );
}
