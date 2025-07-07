import { ParkingLotSimpleInfoWithReviewType } from '@/types/mapDataTypes';
import { useEffect, useRef, useState } from 'react';

export function useClickMarkerFromUuid(
  uuid: string,
  parkingLotList: ParkingLotSimpleInfoWithReviewType[]
) {
  const [clickMarker, setClickMarker] =
    useState<ParkingLotSimpleInfoWithReviewType | null>(null);
  const hasFocusedRef = useRef(false);

  useEffect(() => {
    if (uuid && !hasFocusedRef.current && parkingLotList.length > 0) {
      const matched = parkingLotList.find((p) => p.parkingLotUuid === uuid);
      if (matched) {
        setClickMarker(matched);
        hasFocusedRef.current = true;
      }
    }
  }, [parkingLotList, uuid]);

  return { clickMarker, setClickMarker };
}
