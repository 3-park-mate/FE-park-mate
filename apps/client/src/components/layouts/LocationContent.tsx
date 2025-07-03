'use client';
import { coordtoAddressUtil } from '@/utils/mapUtils';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { cn } from '@repo/ui/lib/utils';
import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import LocationPermissionModal from '../common/LocationPermissionModal';
import { useLocationStore } from '@/store/useLocationStore';

export default function LocationContent({ className }: { className?: string }) {
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [location, setLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { latitude, longitude } = useLocationStore();

  useEffect(() => {
    const setCurrentLocation = async () => {
      if (latitude != null && longitude != null) {
        try {
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
        <p className={cn('font-medium text-sm', className)}>{location}</p>
      ) : (
        <p className={cn('font-medium text-sm', className)}>
          주소 불러오기 실패
        </p>
      )}
      <LocationPermissionModal />
    </>
  );
}
