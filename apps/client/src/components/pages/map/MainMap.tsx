'use client';

import { useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import useMapCenter from '@/hooks/useMapCenter';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [clickMarker, setClickMarker] = useState<string>('');
  const { center, centerMapToCurrentLocation, handleMapChange } =
    useMapCenter();
  const { setGnbNavBar } = useGnbNavBarStore();

  return (
    <>
      <Map
        center={center}
        level={5}
        className="w-full h-screen z-0"
        draggable
        onDragEnd={handleMapChange}
        onZoomChanged={handleMapChange}
        onClick={() => {
          setClickMarker('');
          setGnbNavBar(true);
        }}
        isPanto
      >
        <MapMarkers clickMarker={clickMarker} setClickMarker={setClickMarker} />
        {clickMarker && <ParkingLotSimpleInfoModal parkingLotUuid="" />}
        <CurrentLocationButton onClick={centerMapToCurrentLocation} />
      </Map>
    </>
  );
}
