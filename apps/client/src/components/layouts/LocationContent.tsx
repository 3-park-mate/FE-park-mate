'use client';

import { useLocationAlertStore } from '@/store/useLocationAlertStore';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { coordtoAddressUtil } from '@/utils/mapUtils';
import AlertModal from '@repo/ui/components/common/AlertModal';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { cn } from '@repo/ui/lib/utils';
import React, { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export default function LocationContent() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [location, setLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { openAlert, setOpenAlert } = useLocationAlertStore();

  useEffect(() => {
    const setCurrentLocation = async () => {
      try {
        const { latitude, longitude } = await getCurrentCoordsUtil();
        const address = await coordtoAddressUtil({
          lat: latitude,
          lng: longitude,
        });
        setLocation(address || '');
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading && !error) {
      setCurrentLocation();
    }
  }, [loading, error]);

  if (loading) {
    console.log('로딩중');
    return;
  }

  if (error) {
    console.error('카카오 로딩 에러');
    return;
  }

  return (
    <>
      {' '}
      <AlertModal
        open={openAlert}
        onOpenChange={setOpenAlert}
        errorMessage={'위치 접근 권한을 허용해주세요'}
        theme="primary"
        showCancelButton
      />
      {isLoading ? (
        <DotSpinner className="fill-primary mx-2" />
      ) : location !== '' ? (
        <p className={cn('font-medium text-sm')}>{location}</p>
      ) : (
        <p className="font-medium text-sm">주소 불러오기 실패</p>
      )}
    </>
  );
}
