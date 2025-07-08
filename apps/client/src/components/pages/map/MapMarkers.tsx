'use client';

import {
  MarkerClusterer,
  CustomOverlayMap,
  MapMarker,
} from 'react-kakao-maps-sdk';
import { ParkingLotSimpleInfoWithReviewType } from '@/types/mapDataTypes';
import BasicMarker from './BasicMarker';
import SelectedMarker from './SelectedMarker';
import { useMapStore } from '@/store/useMapStore';

export default function MapMarkers({
  clickMarker,
  parkingLotList,
  setClickMarker,
}: {
  clickMarker: ParkingLotSimpleInfoWithReviewType | null;
  parkingLotList: ParkingLotSimpleInfoWithReviewType[];
  setClickMarker: (id: ParkingLotSimpleInfoWithReviewType) => void;
}) {
  const setIsOpenSimpleModal = useMapStore(
    (state) => state.setIsOpenSimpleModal
  );

  const handleClickMarker = (data: ParkingLotSimpleInfoWithReviewType) => {
    setClickMarker(data);
    setIsOpenSimpleModal(true);
  };

  return (
    parkingLotList.length > 0 && (
      <>
        <MarkerClusterer
          gridSize={70}
          averageCenter
          minLevel={6}
          minClusterSize={1}
        >
          {parkingLotList.map((data) => (
            <MapMarker
              key={`marker-${data.parkingLotUuid}`}
              position={{ lat: data.latitude, lng: data.longitude }}
              clickable={false}
            />
          ))}
        </MarkerClusterer>

        {parkingLotList.map((data) => (
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
    )
  );
}
