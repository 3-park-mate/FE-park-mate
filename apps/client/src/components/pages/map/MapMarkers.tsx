import { MarkerClusterer, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { MarkerDataType } from '@/types/mapDataTypes';
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
            <CustomOverlayMap
              position={{ lat: data.latitude, lng: data.longitude }}
              xAnchor={0.5}
              yAnchor={1.4}
              clickable={true}
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
                  <BasicMarker availableSpots={data.availableSpots} />
                )}
              </div>
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
