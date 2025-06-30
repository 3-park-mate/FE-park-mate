'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import ParkingLotListModal from './ParkingLotListModal';
import FilterButtonSection from './FilterButtonSection';
import ShowListModalButton from './ShowListModalButton';
import { useMapInit } from '@/hooks/map/useMapInit';
import { useParkingLotsFetcher } from '@/hooks/map/useParkingLotFetcher';
import { useClickMarkerFromUuid } from '@/hooks/map/useFocusedMarker';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const hasFetchedRef = useRef(false);
  const [isOpenListModal, setIsOpenListModal] = useState(false);

  const { center, centerMapToCurrentLocation, initParams } = useMapInit();
  const { parkingLotList, fetchData, isLoading } = useParkingLotsFetcher(
    mapRef,
    initParams
  );
  const { clickMarker, setClickMarker } = useClickMarkerFromUuid(
    initParams.parkingLotUuid ?? '',
    parkingLotList
  );

  const { setGnbNavBar } = useGnbNavBarStore();

  const handleMapChange = () => {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLevel() < 7) {
      fetchData();
    }
  };

  useEffect(() => {
    setGnbNavBar(!clickMarker);
  }, [clickMarker, setGnbNavBar]);

  return (
    <>
      <FilterButtonSection />
      <Map
        center={center}
        level={5}
        className="absolute w-full h-full z-0"
        onDragEnd={handleMapChange}
        onZoomChanged={handleMapChange}
        onClick={() => {
          setClickMarker(null);
          setIsOpenListModal(false);
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
            mapLevel={mapRef.current.getLevel()}
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
        setClickMarker={setClickMarker}
        setIsOpenListModal={setIsOpenListModal}
        parkingLotList={parkingLotList}
        isLoading={isLoading}
      />
      {!isOpenListModal && !clickMarker && (
        <ShowListModalButton setIsOpenListModal={setIsOpenListModal} />
      )}
    </>
  );
}
