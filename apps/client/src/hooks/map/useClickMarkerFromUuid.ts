import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';
import { useEffect, useRef, useState } from 'react';

export function useClickMarkerFromUuid(
  uuid: string,
  parkingLotList: ParkingLotsInBoxResponseType
) {
  const [clickMarker, setClickMarker] =
    useState<ParkingLotSimpleInfoType | null>(null);
  const hasFocusedRef = useRef(false);

  useEffect(() => {
    if (
      uuid &&
      !hasFocusedRef.current &&
      parkingLotList.parkingLots.length > 0
    ) {
      const matched = parkingLotList.parkingLots.find(
        (p) => p.parkingLotUuid === uuid
      );
      if (matched) {
        setClickMarker(matched);
        hasFocusedRef.current = true;
      }
    }
  }, [uuid, parkingLotList]);

  return { clickMarker, setClickMarker };
}
