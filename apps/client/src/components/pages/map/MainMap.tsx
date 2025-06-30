'use client';

import { useRef, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import ParkingLotListModal from './ParkingLotListModal';
import useMap from '@/hooks/useMap';
import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import FilterButtonSection from './FilterButtonSection';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const hasFetchedRef = useRef(false);
  const [clickMarker, setClickMarker] =
    useState<ParkingLotSimpleInfoType | null>();
  const [mapLevel, setMapLevel] = useState(5);
  const [isOpenListModal, setIsOpenListModal] = useState<boolean>(false);
  const {
    center,
    centerMapToCurrentLocation,
    handleMapChange,
    parkingLotList,
    fetchData,
    isLoading,
  } = useMap(mapRef);

  const { setGnbNavBar } = useGnbNavBarStore();

  return (
    <>
      <FilterButtonSection />
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
          setClickMarker(null);
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
            clickMarker={clickMarker || null}
            setClickMarker={setClickMarker}
            setIsOpenListModal={setIsOpenListModal}
          />
        )}
      </Map>
      <CurrentLocationButton onClick={centerMapToCurrentLocation} />
      <ParkingLotListModal
        isOpenListModal={isOpenListModal}
        clickMarker={clickMarker || null}
        setIsOpenListModal={setIsOpenListModal}
        parkingLotList={parkingLotList}
        isLoading={isLoading}
      />
    </>
  );
}
