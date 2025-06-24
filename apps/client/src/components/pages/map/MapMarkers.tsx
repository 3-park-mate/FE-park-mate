'use client';

import {
  MarkerClusterer,
  CustomOverlayMap,
  MapMarker,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { ParkingLotsInBoxResponseType } from '@/types/mapDataTypes';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import React, { SetStateAction, useEffect } from 'react';
import BasicMarker from './BasicMarker';
import SelectedMarker from './SelectedMarker';

export default function MapMarkers({
  mapLevel,
  clickMarker,
  markerData,
  setIsOpenListModal,
  setClickMarker,
}: {
  mapLevel: number;
  clickMarker: string;
  markerData: ParkingLotsInBoxResponseType;
  setIsOpenListModal: React.Dispatch<SetStateAction<boolean>>;
  setClickMarker: (id: string) => void;
}) {
  useEffect(() => {
    console.log(markerData.parkingLots);
  }, [markerData]);
  console.log(mapLevel);
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
              setClickMarker(data.parkingLotUuid);
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
            zIndex={clickMarker === data.parkingLotUuid ? 50 : 40}
          >
            <div
              className="relative"
              onClick={() => {
                setIsOpenListModal(false);
                setGnbNavBar(false);
                setClickMarker(data.parkingLotUuid);
              }}
            >
              {clickMarker === data.parkingLotUuid ? (
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
