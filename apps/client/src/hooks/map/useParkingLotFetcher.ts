import { getParkingLotsInBox } from '@/actions/parking/parking-service';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';
import { parseInitMapParams } from '@/utils/mapUtils';
import { RefObject, useCallback, useRef, useState } from 'react';

export function useParkingLotsFetcher(
  mapRef: RefObject<kakao.maps.Map | null>,
  initParams: ReturnType<typeof parseInitMapParams>
) {
  const [parkingLotList, setParkingLotList] =
    useState<ParkingLotsInBoxResponseType>({ parkingLots: [] });

  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const fetchData = useCallback(async () => {
    const map = mapRef.current;
    if (!map || isLoadingRef.current || map.getLevel() > 7) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const data = await getParkingLotsInBox({
        swLat: sw.getLat(),
        swLng: sw.getLng(),
        neLat: ne.getLat(),
        neLng: ne.getLng(),
        isEvChargingAvailable: initParams.ev ?? false,
        entry: initParams.entry,
        exit: initParams.exit,
      });

      setParkingLotList(data);
    } catch (err) {
      console.error('주차장 로드 실패:', err);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [mapRef, initParams]);

  return { parkingLotList, isLoading, fetchData };
}
