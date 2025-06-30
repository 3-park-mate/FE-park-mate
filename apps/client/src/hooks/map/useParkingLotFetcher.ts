'use client';

import { getParkingLotsInBox } from '@/actions/parking/parking-service';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';
import { parseInitMapParams } from '@/utils/mapUtils';
import { RefObject, useCallback, useState } from 'react';

export function useParkingLotsFetcher(
  mapRef: RefObject<kakao.maps.Map | null>,
  initParams: ReturnType<typeof parseInitMapParams>
) {
  const [parkingLotList, setParkingLotList] =
    useState<ParkingLotsInBoxResponseType>({ parkingLots: [] });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    const map = mapRef.current;
    if (!map || isLoading) return;

    const sw = map.getBounds().getSouthWest();
    const ne = map.getBounds().getNorthEast();

    setIsLoading(true);
    try {
      const data = await getParkingLotsInBox({
        swLat: sw.getLat(),
        swLng: sw.getLng(),
        neLat: ne.getLat(),
        neLng: ne.getLng(),
        isEvChargingAvailable: initParams.ev ?? false,
        startDateTime: initParams.entry?.toISOString() ?? '',
        endDateTime: initParams.exit?.toISOString() ?? '',
      });
      setParkingLotList(data);
    } catch (err) {
      console.error('주차장 로드 실패:', err);
    } finally {
      setIsLoading(false);
    }
  }, [mapRef, initParams, isLoading]);

  return { parkingLotList, isLoading, fetchData };
}
