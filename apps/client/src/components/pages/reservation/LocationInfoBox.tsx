'use client';
import React, { useEffect, useState } from 'react';
import { ReservationInfoBox } from './ReservationInfoBox';
import { Input } from '@repo/ui/components/base/input';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

interface searchLocationType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

export default function LocationInfoBox({ select }: { select: string }) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services'],
  });
  const [searchResults, setSearchResults] = useState<searchLocationType[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (loading) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(inputValue, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: parseFloat(data[i]?.y || ''),
              lng: parseFloat(data[i]?.x || ''),
            },
            content: data[i]?.place_name || '',
          });
        }
        setSearchResults(markers);
        console.log(searchResults);
      }
    });
  }, [inputValue]);

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);
  if (error) return <div>카카오맵 로딩 실패: {error.message}</div>;
  if (loading) return <div>지도 불러오는 중...</div>;

  return select !== 'selectLocation' ? (
    <>
      <ReservationInfoBox boxName="위치" buttonName="위치 추가" />
    </>
  ) : (
    <div className="rounded-sm p-6 bg-white/60 shadow-md">
      <h2 className="text-2xl font-semibold">위치</h2>
      <div className="flex flex-col items-center py-3">
        <Input
          onChange={(e) => setInputValue(e.currentTarget.value)}
          placeholder="위치를 검색하세요"
          className="border-2 focus-visible:border-black/100 transition-all"
        />
      </div>
    </div>
  );
}
