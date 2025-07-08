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
import CarLoader from '@repo/ui/components/common/CarLoader';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';

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

  const { centerMapToCurrentLocation, initParams } = useMapInit(mapRef);
  const { parkingLotList, fetchData, isLoading } = useParkingLotsFetcher(
    mapRef,
    initParams
  );
  const { clickMarker, setClickMarker } = useClickMarkerFromUuid(
    initParams.parkingLotUuid ?? '',
    parkingLotList
  );

  const hasFetchedRef = useRef(false);

  const handleChange = (mapRef: kakao.maps.Map) => {
    fetchData();
    const center = mapRef.getCenter();
    setCenter({ lat: center.getLat(), lng: center.getLng() });
    setLevel(mapRef.getLevel());
  };

  useEffect(() => {
    setGnbNavBar(!clickMarker);

    if (clickMarker && mapRef.current) {
      const { latitude, longitude } = clickMarker;
      const position = new kakao.maps.LatLng(latitude, longitude);
      mapRef.current.setCenter(position);
      setCenter({ lat: latitude, lng: longitude });
    }
  }, [clickMarker, setGnbNavBar, setCenter]);

  // useEffect(() => {
  //   setClickMarker(null);
  // }, [setClickMarker]);

  return (
    <>
      <FilterMapSection />
      <Map
        center={
          center.lat !== undefined && center.lng !== undefined
            ? { lat: center.lat, lng: center.lng }
            : { lat: 37.5714, lng: 126.9768 }
        }
        level={level}
        className="absolute w-full h-full z-0"
        onDragEnd={handleChange}
        onZoomChanged={handleChange}
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
      {/* {isLoading && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <DotSpinner />
          <p>주차장 정보 불러오는 중..</p>
        </div>
      )} */}
      <CurrentLocationButton
        className={
          (clickMarker && 'bottom-[250px]') ||
          (isOpenListModal && 'bottom-[300px]') ||
          ''
        }
        onClick={() => centerMapToCurrentLocation()}
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
