'use client';

import { useEffect, useState } from 'react';
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

  const [clickMarker, setClickMarker] = useState<string>();
  const [isOpenListModal, setIsOpenListModal] = useState<boolean>(true);
  const {
    center,
    centerMapToCurrentLocation,
    handleMapChange,
    parkingLotList,
  } = useMap();

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
        onDragEnd={handleMapChange}
        onClick={() => {
          setClickMarker('');
          setIsOpenListModal(false);
          setGnbNavBar(true);
        }}
        isPanto
      >
        {parkingLotList && (
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
      {parkingLotList && (
        <ParkingLotListModal
          isOpenListModal={isOpenListModal}
          clickMarker={clickMarker || ''}
          setIsOpenListModal={setIsOpenListModal}
          parkingLotList={parkingLotList}
        />
      )}
    </section>
  );
}
