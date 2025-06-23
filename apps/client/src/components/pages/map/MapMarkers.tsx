import { MarkerClusterer, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { ParkingLotsInBoxResponseType } from '@/types/mapDataTypes';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import React, { SetStateAction } from 'react';
import BasicMarker from './BasicMarker';
import SelectedMarker from './SelectedMarker';

export default function MapMarkers({
  clickMarker,
  markerData,
  setIsOpenListModal,
  setClickMarker,
}: {
  clickMarker: string;
  markerData: ParkingLotsInBoxResponseType;
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
        {markerData.parkingLots.map((data, index) => (
          <React.Fragment key={index}>
            <CustomOverlayMap
              position={{ lat: data.latitude, lng: data.longitude }}
              xAnchor={0.5}
              yAnchor={1.4}
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
          </React.Fragment>
        ))}
      </MarkerClusterer>
      {clickMarker && <ParkingLotSimpleInfoModal clickMarker={clickMarker} />}
    </>
  );
}