import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';

export default function useMapCenter() {
  const searchParams = useSearchParams();

  const [center, setCenter] = useState({ lat: 37.5714, lng: 126.9768 });

  const initMap = useCallback(async () => {
    const latParam = Number(searchParams.get('lat'));
    const lngParam = Number(searchParams.get('lng'));
    if (latParam && lngParam) {
      setCenter({ lat: latParam, lng: lngParam });
    } else {
      try {
        const { latitude, longitude } = await getCurrentCoordsUtil();
        setCenter({ lat: latitude, lng: longitude });
      } catch (err) {
        console.log('지도 중심 설정 실패:', err);
      }
    }
  }, [searchParams]);

  const centerMapToCurrentLocation = useCallback(async () => {
    try {
      const { latitude, longitude } = await getCurrentCoordsUtil();
      setCenter({ lat: latitude, lng: longitude });
    } catch (err) {
      console.log('지도 중심 설정 실패:', err);
    }
  }, []);

  const handleMapChange = (map: kakao.maps.Map) => {
    const lat = map.getCenter().getLat();
    const lng = map.getCenter().getLng();
    setCenter({ lat, lng });
  };

  useEffect(() => {
    initMap();
  }, [initMap]);

  return {
    center,
    initMap,
    centerMapToCurrentLocation,
    handleMapChange,
  };
}
