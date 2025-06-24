'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import ParkingLotListModal from './ParkingLotListModal';
import useMap from '@/hooks/useMap';
import FilterSection from './FilterSection';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const hasFetchedRef = useRef(false);
  const [clickMarker, setClickMarker] = useState<string>();
  const [mapLevel, setMapLevel] = useState(5);
  const [isOpenListModal, setIsOpenListModal] = useState<boolean>(true);
  const {
    center,
    centerMapToCurrentLocation,
    handleMapChange,
    parkingLotList,
    fetchData,
  } = useMap(mapRef);
  useEffect(() => {
    console.log(parkingLotList.parkingLots.length, '주차장개수');
  }, [parkingLotList]);

  const { setGnbNavBar } = useGnbNavBarStore();

  return (
    <section>
      <FilterSection />
      <Map
        center={center}
        level={5}
        className="absolute w-full h-full z-0"
        onDragEnd={handleMapChange}
        onZoomChanged={(map) => {
          handleMapChange();
          setMapLevel(map.getLevel());
        }}
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
        {parkingLotList.parkingLots.length > 0 && mapRef.current && (
          <MapMarkers
            mapLevel={mapLevel}
            markerData={parkingLotList}
            clickMarker={clickMarker || ''}
            setClickMarker={setClickMarker}
            setIsOpenListModal={setIsOpenListModal}
          />
        )}
      </Map>
      {/* <FilterButton /> */}
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
