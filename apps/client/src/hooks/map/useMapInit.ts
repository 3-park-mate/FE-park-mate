import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { parseInitMapParams } from '@/utils/mapUtils';
import { useSearchParams } from 'next/navigation';

export function useMapInit(mapRef: RefObject<kakao.maps.Map | null>) {
  const searchParams = useSearchParams();
  const initParams = useMemo(
    () => parseInitMapParams(searchParams),
    [searchParams]
  );

  const [center, setCenter] = useState({
    lat: initParams.lat || 37.5714,
    lng: initParams.lng || 126.9768,
  });

  const centerMapToCurrentLocation = useCallback(async () => {
    try {
      const { lat, lng } = await getCurrentCoordsUtil();
      setCenter({ lat, lng });

      if (mapRef.current) {
        const kakaoLatLng = new kakao.maps.LatLng(lat, lng);
        mapRef.current.setCenter(kakaoLatLng);
      }
    } catch (e) {
      console.error('현재 위치 가져오기 실패:', e);
    }
  }, [mapRef]);

  useEffect(() => {
    if (initParams.lat && initParams.lng) {
      setCenter({ lat: initParams.lat, lng: initParams.lng });
    } else {
      centerMapToCurrentLocation();
    }
  }, [initParams.lat, initParams.lng, centerMapToCurrentLocation]);

  return { center, centerMapToCurrentLocation, initParams };
}
