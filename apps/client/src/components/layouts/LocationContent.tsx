'use client';

import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { coordtoAddressUtil } from '@/utils/mapUtils';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { cn } from '@repo/ui/lib/utils';
import React, { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import LocationPermissionModal from '../common/LocationPermissionModal';

export default function LocationContent() {
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [location, setLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setCurrentLocation = async () => {
      try {
        const { lat, lng } = await getCurrentCoordsUtil();
        const address = await coordtoAddressUtil({
          lat: lat,
          lng: lng,
        });
        setLocation(address || '');
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      setCurrentLocation();
    }
  }, [loading]);

  return (
    <>
      {isLoading ? (
        <DotSpinner className="fill-primary mx-2" />
      ) : location !== '' ? (
        <p className={cn('font-medium text-sm')}>{location}</p>
      ) : (
        <p className="font-medium text-sm">주소 불러오기 실패</p>
      )}
      <LocationPermissionModal />
    </>
  );
}
