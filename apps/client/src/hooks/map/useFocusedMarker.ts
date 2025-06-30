'use client';

import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';
import { useEffect, useState } from 'react';

export function useClickMarkerFromUuid(
  uuid: string,
  parkingLotList: ParkingLotsInBoxResponseType
) {
  const [clickMarker, setClickMarker] =
    useState<ParkingLotSimpleInfoType | null>(null);

  useEffect(() => {
    if (uuid && parkingLotList.parkingLots.length > 0) {
      const matched = parkingLotList.parkingLots.find(
        (p) => p.parkingLotUuid === uuid
      );
      if (matched) setClickMarker(matched);
    }
  }, [uuid, parkingLotList]);

  return { clickMarker, setClickMarker };
}
