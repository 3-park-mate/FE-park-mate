import { getParkingLotsInBox } from '@/actions/parking/parking-service';
import { getReviewSummaryData } from '@/actions/review/review-service';
import { ParkingLotSimpleInfoWithReviewType } from '@/types/mapDataTypes';
import { parseInitMapParams } from '@/utils/mapUtils';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export function useParkingLotsFetcher(
  mapRef: RefObject<kakao.maps.Map | null>,
  initParams: ReturnType<typeof parseInitMapParams>
) {
  const [parkingLotList, setParkingLotList] = useState<
    ParkingLotSimpleInfoWithReviewType[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const fetchData = useCallback(async () => {
    const map = mapRef.current;
    if (!map || isLoadingRef.current || map.getLevel() > 7) {
      return { success: true, data: [] };
    }

    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const parkingLotData = await getParkingLotsInBox({
        swLat: sw.getLat(),
        swLng: sw.getLng(),
        neLat: ne.getLat(),
        neLng: ne.getLng(),
        isEvChargingAvailable: initParams.ev ?? false,
        entry: initParams.entry,
        exit: initParams.exit,
      });
      const parkingLots = parkingLotData.parkingLots;

      const parkingLotsWithReviewCount = await Promise.all(
        parkingLots.map(async (parkingLot) => {
          try {
            const reviewSummaryRes = await getReviewSummaryData(
              parkingLot.parkingLotUuid
            );

            return {
              ...parkingLot,
              rating: reviewSummaryRes.success
                ? (reviewSummaryRes.data?.averageRating ?? 0)
                : 0,
              totalReviews: reviewSummaryRes.success
                ? (reviewSummaryRes.data?.totalReviews ?? 0)
                : 0,
            };
          } catch (err) {
            console.error(`Failed to load review for ${parkingLot.name}:`, err);
            return { ...parkingLot, rating: 0, totalReviews: 0 };
          }
        })
      );
      setParkingLotList(parkingLotsWithReviewCount);
    } catch (err) {
      console.error('주차장 로드 실패:', err);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [mapRef, initParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { parkingLotList, isLoading, fetchData };
}
