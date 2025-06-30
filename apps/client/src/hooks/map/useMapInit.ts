'use client';

import { useCallback, useEffect, useState } from 'react';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { parseInitMapParams } from '@/utils/mapUtils';
import { useSearchParams } from 'next/navigation';

export function useMapInit() {
  const searchParams = useSearchParams();
  const initParams = parseInitMapParams(searchParams);

  const [center, setCenter] = useState({
    lat: initParams.lat || 37.5714,
    lng: initParams.lng || 126.9768,
  });

  const centerMapToCurrentLocation = useCallback(async () => {
    try {
      const { lat, lng } = await getCurrentCoordsUtil();
      setCenter({ lat, lng });
    } catch (e) {
      console.error('현재 위치 가져오기 실패:', e);
    }
  }, []);

  useEffect(() => {
    if (initParams.lat && initParams.lng) {
      setCenter({ lat: initParams.lat, lng: initParams.lng });
    } else {
      centerMapToCurrentLocation();
    }
  }, [initParams.lat, initParams.lng, centerMapToCurrentLocation]);

  return { center, centerMapToCurrentLocation, initParams };
}
