import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';

export default function useMapCenter() {
  const searchParams = useSearchParams();
  const latParam = Number(searchParams.get('lat'));
  const lngParam = Number(searchParams.get('lng'));

  const [center, setCenter] = useState({ lat: 37.5727, lng: 126.9595 });

  const initMap = useCallback(async () => {
    if (latParam && lngParam) {
      setCenter({ lat: latParam, lng: lngParam });
    } else {
      try {
        const { latitude, longitude } = await getCurrentCoordsUtil();
        setCenter({ lat: latitude, lng: longitude });
      } catch {
        setCenter({ lat: 37.5714, lng: 126.9768 });
      }
    }
  }, [latParam, lngParam]);

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
    handleMapChange,
  };
}
