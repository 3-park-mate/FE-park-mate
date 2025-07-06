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

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const isOpenSimpleModal = useMapStore((state) => state.isOpenSimpleModal);
  const isOpenListModal = useMapStore((state) => state.isOpenListModal);
  const center = useMapStore((state) => state.center);
  const setCenter = useMapStore((state) => state.setCenter);
  const setGnbNavBar = useGnbNavBarStore((state) => state.setGnbNavBar);

  const clearSelection = useMapStore((state) => state.clearSelection);
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
    setCenter({
      lat: mapRef.getCenter().getLat(),
      lng: mapRef.getCenter().getLng(),
    });
  };

  useEffect(() => {
    setGnbNavBar(!clickMarker);
    if (clickMarker?.latitude && clickMarker.longitude) {
      mapRef.current?.setCenter(
        new kakao.maps.LatLng(clickMarker?.latitude, clickMarker?.longitude)
      );
      setCenter({ lat: clickMarker?.latitude, lng: clickMarker?.longitude });
    }
  }, [clickMarker, setGnbNavBar, setCenter]);

  useEffect(() => {
    setClickMarker(null);
  }, [setClickMarker]);

  return (
    <>
      <FilterMapSection />
      <Map
        center={
          center.lat !== undefined && center.lng !== undefined
            ? { lat: center.lat, lng: center.lng }
            : { lat: 37.5714, lng: 126.9768 }
        }
        level={5}
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
        {parkingLotList.parkingLots.length > 0 && mapRef.current && (
          <MapMarkers
            mapRef={mapRef.current}
            parkingLotList={parkingLotList}
            clickMarker={clickMarker || null}
            setClickMarker={setClickMarker}
          />
        )}
      </Map>
      <CurrentLocationButton
        className={
          (clickMarker && 'bottom-1/3') ||
          (isOpenListModal && 'bottom-3/7') ||
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
