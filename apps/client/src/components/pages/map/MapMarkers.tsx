import { MarkerClusterer, MapMarker } from 'react-kakao-maps-sdk';
import { markerDummyData } from '@/data/markerDummyData';
import { MarkerDataType } from '@/types/mapDataTypes';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';

export default function MapMarkers({
  clickMarker,
  setClickMarker,
}: {
  clickMarker: string;
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
        {markerDummyData.map((data: MarkerDataType) => (
          <MapMarker
            key={data.parkingLotUuid}
            position={{ lat: data.latitude, lng: data.longitude }}
            onClick={() => {
              setClickMarker(data.parkingLotUuid);
              setGnbNavBar(false);
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
