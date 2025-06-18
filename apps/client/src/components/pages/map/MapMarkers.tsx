import { MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';
import { MarkerDataType } from '@/types/mapDataTypes';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { SetStateAction } from 'react';

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
        {markerData.map((data: MarkerDataType) => (
          <MapMarker
            key={data.parkingLotUuid}
            position={{ lat: data.latitude, lng: data.longitude }}
            onClick={() => {
              setIsOpenListModal(false);
              setGnbNavBar(false);
              setClickMarker(data.parkingLotUuid);
            }}
          />
        ))}
      </MarkerClusterer>
      {clickMarker && (
        <ParkingLotSimpleInfoModal parkingLotUuid={clickMarker} />
      )}
    </>
  );
}
