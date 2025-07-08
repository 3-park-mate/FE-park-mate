import { useEffect, useMemo } from 'react';
import { parseInitMapParams } from '@/utils/mapUtils';
import { useSearchParams } from 'next/navigation';
import { useMapStore } from '@/store/useMapStore';
import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';

export function useMapInit() {
  const center = useMapStore((state) => state.center);
  const setCenter = useMapStore((state) => state.setCenter);
  const searchParams = useSearchParams();
  const initParams = useMemo(
    () => parseInitMapParams(searchParams),
    [searchParams]
  );

  useEffect(() => {
    const setInitialCenter = async () => {
      const isCenterEmpty = !center.lat || !center.lng;

      if (isCenterEmpty) {
        if (initParams.lat && initParams.lng) {
          setCenter({ lat: initParams.lat, lng: initParams.lng });
        } else {
          try {
            const { lat, lng } = await getCurrentCoordsUtil();
            setCenter({ lat, lng });
          } catch {
            setCenter({ lat: 37.5714, lng: 126.9768 });
          }
        }
      }
    };

    setInitialCenter();
  }, [initParams, center, setCenter]);

  return { initParams };
}
