'use client';

import { useEffect, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import useMapCenter from '@/hooks/useMapCenter';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { markerDummyData } from '@/data/markerDummyData';
import ParkingLotListModal from './ParkingLotListModal';
import FilterButton from './FilterButton';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [clickMarker, setClickMarker] = useState<string>('');
  const [isOpenListModal, setIsOpenListModal] = useState<boolean>(true);
  const { center, centerMapToCurrentLocation, handleMapChange } =
    useMapCenter();
  const markerData = markerDummyData;
  const { setGnbNavBar } = useGnbNavBarStore();
  useEffect(() => {
    console.log(clickMarker);
  }, [clickMarker]);
  return (
    <section>
      <Map
        center={center}
        level={5}
        className="absolute w-full h-full z-0"
        draggable
        onDragEnd={handleMapChange}
        onZoomChanged={handleMapChange}
        onClick={() => {
          setClickMarker('');
          setIsOpenListModal(false);
          setGnbNavBar(true);
        }}
        isPanto
      >
        <MapMarkers
          markerData={markerData}
          clickMarker={clickMarker}
          setClickMarker={setClickMarker}
          setIsOpenListModal={setIsOpenListModal}
        />
      </Map>
      <FilterButton />
      <CurrentLocationButton onClick={centerMapToCurrentLocation} />
      <ParkingLotListModal
        isOpenListModal={isOpenListModal}
        clickMarker={clickMarker}
        setIsOpenListModal={setIsOpenListModal}
        markerData={markerData}
      />
    </section>
  );
}
