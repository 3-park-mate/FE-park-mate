'use client';

import {
  MarkerClusterer,
  CustomOverlayMap,
  MapMarker,
} from 'react-kakao-maps-sdk';
import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { SetStateAction } from 'react';
import BasicMarker from './BasicMarker';
import SelectedMarker from './SelectedMarker';
import { ParkingLotsInBoxResponseType } from '@/types/parkingDataTypes';

export default function MapMarkers({
  mapLevel,
  clickMarker,
  markerData,
  setIsOpenListModal,
  setClickMarker,
}: {
  mapLevel: number;
  clickMarker: ParkingLotSimpleInfoType | null;
  markerData: ParkingLotsInBoxResponseType;
  setIsOpenListModal: React.Dispatch<SetStateAction<boolean>>;
  setClickMarker: (id: ParkingLotSimpleInfoType) => void;
}) {
  const { setGnbNavBar } = useGnbNavBarStore();
  return (
    <>
      <MarkerClusterer
        gridSize={70}
        averageCenter
        minLevel={6}
        minClusterSize={1}
      >
        {markerData.parkingLots.map((data) => (
          <MapMarker
            key={`marker-${data.parkingLotUuid}`}
            position={{ lat: data.latitude, lng: data.longitude }}
            clickable={true}
            onClick={() => {
              setIsOpenListModal(false);
              setGnbNavBar(false);
              setClickMarker(data);
            }}
          />
        ))}
      </MarkerClusterer>

      {mapLevel <= 5 &&
        markerData.parkingLots.map((data) => (
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
                setIsOpenListModal(false);
                setGnbNavBar(false);
                setClickMarker(data);
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

      {clickMarker && <ParkingLotSimpleInfoModal clickMarker={clickMarker} />}
    </>
  );
}
