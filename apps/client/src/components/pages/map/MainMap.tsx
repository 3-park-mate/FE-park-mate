'use client';

import { useRef, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import ParkingLotListModal from './ParkingLotListModal';
import FilterButton from './FilterButton';
import useMap from '@/hooks/useMap';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const hasFetchedRef = useRef(false);
  const [clickMarker, setClickMarker] = useState<string>();
  const [isOpenListModal, setIsOpenListModal] = useState<boolean>(true);
  const {
    center,
    centerMapToCurrentLocation,
    handleMapChange,
    parkingLotList,
    fetchData,
  } = useMap(mapRef);

  const { setGnbNavBar } = useGnbNavBarStore();

  return (
    <section>
      <Map
        center={center}
        level={5}
        className="absolute w-full h-full z-0"
        onDragEnd={handleMapChange}
        onZoomChanged={handleMapChange}
        onClick={() => {
          setClickMarker('');
          setIsOpenListModal(false);
          setGnbNavBar(true);
        }}
        onCreate={(map) => {
          mapRef.current = map;
          if (!hasFetchedRef.current) {
            fetchData();
            hasFetchedRef.current = true;
          }
        }}
        isPanto
      >
        {parkingLotList.parkingLots.length > 0 && (
          <MapMarkers
            markerData={parkingLotList}
            clickMarker={clickMarker || ''}
            setClickMarker={setClickMarker}
            setIsOpenListModal={setIsOpenListModal}
          />
        )}
      </Map>
      <FilterButton />
      <CurrentLocationButton onClick={centerMapToCurrentLocation} />
      <ParkingLotListModal
        isOpenListModal={isOpenListModal}
        clickMarker={clickMarker || ''}
        setIsOpenListModal={setIsOpenListModal}
        parkingLotList={parkingLotList}
      />
    </section>
  );
}
