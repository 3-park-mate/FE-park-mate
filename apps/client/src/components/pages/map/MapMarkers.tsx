'use client';

import {
  MarkerClusterer,
  CustomOverlayMap,
  MapMarker,
} from 'react-kakao-maps-sdk';
import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import BasicMarker from './BasicMarker';
import SelectedMarker from './SelectedMarker';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';
import { useMapStore } from '@/store/useMapStore';

export default function MapMarkers({
  mapRef,
  clickMarker,
  parkingLotList,
  setClickMarker,
}: {
  mapRef: kakao.maps.Map;
  clickMarker: ParkingLotSimpleInfoType | null;
  parkingLotList: ParkingLotsInBoxResponseType;
  setClickMarker: (id: ParkingLotSimpleInfoType) => void;
}) {
  const setIsOpenSimpleModal = useMapStore(
    (state) => state.setIsOpenSimpleModal
  );

  const handleClickMarker = (data: ParkingLotSimpleInfoType) => {
    setClickMarker(data);
    setIsOpenSimpleModal(true);
  };

  return (
    <>
      <MarkerClusterer
        gridSize={70}
        averageCenter
        minLevel={6}
        minClusterSize={1}
      >
        {parkingLotList.parkingLots.map((data) => (
          <MapMarker
            key={`marker-${data.parkingLotUuid}`}
            position={{ lat: data.latitude, lng: data.longitude }}
            clickable={false}
          />
        ))}
      </MarkerClusterer>

      {mapRef.getLevel() <= 5 &&
        parkingLotList.parkingLots.map((data) => (
          <CustomOverlayMap
            key={`overlay-${data.parkingLotUuid}`}
            position={{ lat: data.latitude, lng: data.longitude }}
            clickable={true}
            zIndex={
              clickMarker?.parkingLotUuid === data.parkingLotUuid ? 50 : 40
            }
          >
            <div
              className="relative"
              onClick={() => {
                handleClickMarker(data);
              }}
            >
              {clickMarker?.parkingLotUuid === data.parkingLotUuid ? (
                <SelectedMarker />
              ) : (
                <BasicMarker availableSpots={data.availableSpotCount} />
              )}
            </div>
          </CustomOverlayMap>
        ))}
    </>
  );
}
