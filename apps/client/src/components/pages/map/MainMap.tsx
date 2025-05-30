'use client';

import { useParkingFilterStore } from '@/store/useParkingFilterStore';
import { getCurrentLocationUtils } from '@/utils/getCurrentLocationUtils';
import React, { useEffect } from 'react';
import {
  Map,
  MapMarker,
  MarkerClusterer,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import { markerDummyData } from '@/data/markerDummyData';
import { markerDataType } from '@/types/markerDataType';

export default function MainMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const parkingFilter = useParkingFilterStore((state) => state);

  const updateMapInfo = (map: kakao.maps.Map) => {
    const center = map.getCenter();
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    parkingFilter.setMapCenter(center.getLat(), center.getLng(), null);
    parkingFilter.setMapBounds(
      neLatLng.getLat(),
      swLatLng.getLat(),
      neLatLng.getLng(),
      swLatLng.getLng()
    );
    console.log(parkingFilter);
  };

  const currentLocation = async () => {
    try {
      const { latitude, longitude } = await getCurrentLocationUtils();
      parkingFilter.setMapCenter(latitude, longitude, null);

      console.log('현재위치', latitude, longitude);
    } catch (error) {
      console.log('현재위치 실패', error);
    }
  };

  useEffect(() => {
    currentLocation();
  }, []);

  if (loading) return <div>지도 불러오는 중...</div>;
  if (error) return <div>카카오맵 로딩 실패: {error.message}</div>;

  return (
    <>
      <Map
        center={{
          lat: parkingFilter.mapCenter?.lat || 37.5727,
          lng: parkingFilter.mapCenter?.lng || 126.9695,
        }}
        level={5}
        className="w-full relative min-h-screen z-0"
        onDrag={(map) => updateMapInfo(map)}
        onZoomChanged={(map) => updateMapInfo(map)}
        isPanto
      >
        {parkingFilter.mapCenter?.lat && parkingFilter.mapCenter?.lng && (
          <MapMarker
            position={{
              lat: parkingFilter.mapCenter?.lat,
              lng: parkingFilter.mapCenter?.lng,
            }}
          />
        )}
        <MarkerClusterer
          gridSize={70}
          averageCenter={true}
          minLevel={7}
          minClusterSize={1}
          disableClickZoom
        >
          {markerDummyData.map((data: markerDataType) => (
            <MapMarker
              key={data.parkingLotUuid}
              position={{ lat: data.latitude, lng: data.longitude }}
            />
          ))}
        </MarkerClusterer>
        <CurrentLocationButton onClick={currentLocation} />
      </Map>
    </>
  );
}
