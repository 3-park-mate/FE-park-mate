import {
  MarkerClusterer,
  MapMarker,
  CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import { MarkerDataType } from '@/types/mapDataTypes';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import React, { SetStateAction } from 'react';

export default function MapMarkers({
  clickMarker,
  markerData,
  setIsOpenListModal,
  setClickMarker,
}: {
  clickMarker: string;
  markerData: MarkerDataType[];
  setIsOpenListModal: React.Dispatch<SetStateAction<boolean>>;
  setClickMarker: (id: string) => void;
}) {
  const { setGnbNavBar } = useGnbNavBarStore();

  return (
    <>
      <MarkerClusterer
        gridSize={70}
        averageCenter
        minLevel={7}
        minClusterSize={1}
        disableClickZoom
      >
        {markerData.map((data: MarkerDataType, index) => (
          <React.Fragment key={index}>
            <MapMarker
              image={
                clickMarker === data.parkingLotUuid
                  ? {
                      src: '/img/circle-parking.png',
                      size: { width: 70, height: 70 },
                    }
                  : { src: '/img/marker.png', size: { width: 42, height: 50 } }
              }
              position={{ lat: data.latitude, lng: data.longitude }}
              onClick={() => {
                setIsOpenListModal(false);
                setGnbNavBar(false);
                setClickMarker(data.parkingLotUuid);
              }}
            />
            <CustomOverlayMap
              position={{ lat: data.latitude, lng: data.longitude }}
              yAnchor={1.4}
            >
              <p className="bg-white h-8 w-8 inline-flex items-center justify-center rounded-full shadow-md font-semibold">
                {data.availableSpots || 0}
              </p>
            </CustomOverlayMap>
          </React.Fragment>
        ))}
      </MarkerClusterer>
      {clickMarker && (
        <ParkingLotSimpleInfoModal parkingLotUuid={clickMarker} />
      )}
    </>
  );
}
