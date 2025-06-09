'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@repo/ui/components/base/input';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export interface searchLocationResultType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  road_address_name: string;
}

export default function LocationInfoBox() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services'],
  });

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<
    searchLocationResultType[]
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
        console.log(data);
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
        console.log(searchResults);
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
    <div className="flex flex-col items-center py-3">
      <Input
        onChange={(e) => setInputValue(e.currentTarget.value)}
        placeholder="위치를 검색하세요"
        className="border-2 focus-visible:border-black/100 transition-all"
      />
      {searchResults.length > 0 ? (
        searchResults.map((data, index) => (
          <div
            key={`${data.content}-${index}`}
            className="w-full px-2 py-2 border-b-1"
          >
            <p className="font-medium">{data.content}</p>
            <p className="text-sm text-gray-2">{data.road_address_name}</p>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}
