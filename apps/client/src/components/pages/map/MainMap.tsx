'use client';

import { useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import useMapCenter from '@/hooks/useMapCenter';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { FilterIcon } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

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
          setGnbNavBar(true);
        }}
        isPanto
      >
        <MapMarkers clickMarker={clickMarker} setClickMarker={setClickMarker} />
        {clickMarker && <ParkingLotSimpleInfoModal parkingLotUuid="" />}
      </Map>
      <CurrentLocationButton onClick={centerMapToCurrentLocation} />
      <button
        className={cn(
          'absolute top-20 right-5 z-50 p-2 bg-gray-100 rounded-full shadow-md'
        )}
      >
        <FilterIcon className="fill-black stroke-black" />
      </button>
    </section>
  );
}
