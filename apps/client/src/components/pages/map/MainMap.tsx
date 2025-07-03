'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import ParkingLotListModal from './ParkingLotListModal';
import ShowListModalButton from './ShowListModalButton';
import { useMapInit } from '@/hooks/map/useMapInit';
import { useParkingLotsFetcher } from '@/hooks/map/useParkingLotFetcher';
import { useClickMarkerFromUuid } from '@/hooks/map/useClickMarkerFromUuid';
import FilterMapSection from './filter/FilterMapSection';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const { center, centerMapToCurrentLocation, initParams } = useMapInit(mapRef);
  const { parkingLotList, fetchData, isLoading } = useParkingLotsFetcher(
    mapRef,
    initParams
  );
  const { clickMarker, setClickMarker } = useClickMarkerFromUuid(
    initParams.parkingLotUuid ?? '',
    parkingLotList
  );

  const hasFetchedRef = useRef(false);
  const [isOpenListModal, setIsOpenListModal] = useState(false);

  const { setGnbNavBar } = useGnbNavBarStore();

  useEffect(() => {
    setGnbNavBar(!clickMarker);
  }, [clickMarker, setGnbNavBar]);

  useEffect(() => {
    if (mapRef.current && clickMarker) {
      const latlng = new kakao.maps.LatLng(
        clickMarker.latitude,
        clickMarker.longitude
      );
      mapRef.current.setCenter(latlng);
    }
    console.log(clickMarker);
  }, [clickMarker]);

  return (
    <>
      <FilterMapSection />
      <Map
        center={center}
        level={5}
        className="absolute w-full h-full z-0"
        onDragEnd={fetchData}
        onZoomChanged={fetchData}
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
      <CurrentLocationButton
        className={((clickMarker || isOpenListModal) && 'bottom-75') || ''}
        onClick={centerMapToCurrentLocation}
      />
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
