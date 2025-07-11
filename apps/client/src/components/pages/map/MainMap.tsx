'use client';

import { useEffect, useRef } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import ParkingLotListModal from './ParkingLotListModal';
import ShowListModalButton from './ShowListModalButton';
import { useMapInit } from '@/hooks/map/useMapInit';
import { useParkingLotsFetcher } from '@/hooks/map/useParkingLotFetcher';
import { useClickMarkerFromUuid } from '@/hooks/map/useClickMarkerFromUuid';
import FilterMapSection from './filter/FilterMapSection';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { useMapStore } from '@/store/useMapStore';
import throttle from 'lodash/throttle';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const isOpenListModal = useMapStore((state) => state.isOpenListModal);
  const center = useMapStore((state) => state.center);
  const level = useMapStore((state) => state.level);
  const setLevel = useMapStore((state) => state.setLevel);
  const setCenter = useMapStore((state) => state.setCenter);
  const clearSelection = useMapStore((state) => state.clearSelection);

  const setGnbNavBar = useGnbNavBarStore((state) => state.setGnbNavBar);

  const { initParams } = useMapInit();
  const { parkingLotList, fetchData, isLoading } = useParkingLotsFetcher(
    mapRef,
    initParams
  );
  const { clickMarker, setClickMarker } = useClickMarkerFromUuid(
    initParams.parkingLotUuid ?? '',
    parkingLotList
  );

  const hasFetchedRef = useRef(false);

  const handleChange = () => {
    if (!mapRef.current) return;
    const center = mapRef.current.getCenter();
    setCenter({ lat: center.getLat(), lng: center.getLng() });
    setLevel(mapRef.current.getLevel());
    fetchData();
  };

  const throttleHandleChange = useRef(throttle(handleChange, 3000)).current;

  useEffect(() => {
    setGnbNavBar(!clickMarker);
    if (!clickMarker || !mapRef.current) return;
    const { latitude, longitude } = clickMarker;
    const position = new kakao.maps.LatLng(latitude, longitude);
    mapRef.current.setCenter(position);
    setCenter({ lat: latitude, lng: longitude });
  }, [clickMarker, setGnbNavBar, setCenter]);

  if (!center.lat || !center.lng) return;
  return (
    <>
      <FilterMapSection />
      <Map
        center={{ lat: center.lat, lng: center.lng }}
        level={level}
        className="absolute w-full h-full z-0"
        onDragEnd={throttleHandleChange}
        onZoomChanged={throttleHandleChange}
        onClick={() => {
          setClickMarker(null);
          clearSelection();
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
        {mapRef.current && (
          <MapMarkers
            parkingLotList={parkingLotList}
            clickMarker={clickMarker || null}
            setClickMarker={setClickMarker}
          />
        )}
      </Map>
      <CurrentLocationButton
        className={
          (clickMarker && 'bottom-[250px]') ||
          (isOpenListModal && 'bottom-[300px]') ||
          ''
        }
        map={mapRef.current}
        fetchData={fetchData}
      />
      {clickMarker && (
        <ParkingLotSimpleInfoModal selectedParkingLot={clickMarker} />
      )}
      <ParkingLotListModal
        setClickMarker={setClickMarker}
        parkingLotList={parkingLotList}
        isLoading={isLoading}
      />
      <ShowListModalButton />
    </>
  );
}
