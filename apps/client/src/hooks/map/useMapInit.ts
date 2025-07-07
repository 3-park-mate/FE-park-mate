import { RefObject, useCallback, useEffect, useMemo } from 'react';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { parseInitMapParams } from '@/utils/mapUtils';
import { useSearchParams } from 'next/navigation';
import { useMapStore } from '@/store/useMapStore';

export function useMapInit(mapRef: RefObject<kakao.maps.Map | null>) {
  const center = useMapStore((state) => state.center);
  const setCenter = useMapStore((state) => state.setCenter);
  const searchParams = useSearchParams();
  const initParams = useMemo(
    () => parseInitMapParams(searchParams),
    [searchParams]
  );

  const centerMapToCurrentLocation = useCallback(async () => {
    const FALLBACK_COORDS = { lat: 37.5714, lng: 126.9768 };
    try {
      const { lat, lng } = await getCurrentCoordsUtil();
      if (mapRef.current) {
        mapRef.current.setCenter(new kakao.maps.LatLng(lat, lng));
        setCenter({ lat, lng });
      }
    } catch (e) {
      mapRef.current?.setCenter(
        new kakao.maps.LatLng(FALLBACK_COORDS.lat, FALLBACK_COORDS.lng)
      );
      setCenter(FALLBACK_COORDS);
      console.error('현재 위치 가져오기 실패:', e);
    }
  }, [mapRef, setCenter]);

  useEffect(() => {
    const isCenterEmpty = !center.lat || !center.lng;

    if (isCenterEmpty) {
      if (initParams.lat && initParams.lng) {
        setCenter({ lat: initParams.lat, lng: initParams.lng });
      } else {
        centerMapToCurrentLocation();
      }
    }
  }, [initParams, centerMapToCurrentLocation, setCenter, center]);

  return { centerMapToCurrentLocation, initParams };
}
