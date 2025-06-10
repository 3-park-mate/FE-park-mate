'use client';

import { useParkingFilterStore } from '@/store/useParkingFilterStore';
import { getCurrentLocationUtil } from '@/utils/geolocationUtils';
import { useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  MarkerClusterer,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import CurrentLocationButton from './CurrentLocationButton ';
import { markerDummyData } from '@/data/markerDummyData';
import { MarkerDataType } from '@/types/mapDataTypes';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { useSearchParams } from 'next/navigation';
import { updateMapState } from '@/utils/mapUtils';

export default function MainMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });
  const searchParams = useSearchParams();
  const latParam = Number(searchParams.get('lat'));
  const lngParam = Number(searchParams.get('lng'));

  const { setMapCenter, setMapBounds, mapCenter } = useParkingFilterStore();
  const { setGnbNavBar } = useGnbNavBarStore();

  const [clickMarker, setClickMarker] = useState<string>('');

  const setCurrentLocation = async () => {
    try {
      const { latitude, longitude } = await getCurrentLocationUtil();
      setMapCenter(latitude, longitude, null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (latParam && lngParam) {
      setMapCenter(latParam, lngParam, null);
    } else {
      setCurrentLocation();
    }
  }, []);

  if (loading) return <div>지도 불러오는 중</div>;
  if (error) return <div>카카오맵 로딩 실패: {error.message}</div>;

  return (
    <Map
      center={{
        lat: mapCenter?.lat || 37.5727,
        lng: mapCenter?.lng || 126.9695,
      }}
      level={5}
      className="w-full h-screen z-0"
      onDrag={(map) => updateMapState(map, setMapCenter, setMapBounds)}
      onZoomChanged={(map) => updateMapState(map, setMapCenter, setMapBounds)}
      onClick={() => {
        setClickMarker('');
        setGnbNavBar(true);
      }}
      isPanto
    >
      <MarkerClusterer
        gridSize={70}
        averageCenter={true}
        minLevel={7}
        minClusterSize={1}
        disableClickZoom
      >
        {markerDummyData.map((data: MarkerDataType) => (
          <MapMarker
            key={data.parkingLotUuid}
            position={{ lat: data.latitude, lng: data.longitude }}
            onClick={() => {
              setClickMarker(data.parkingLotUuid);
              setGnbNavBar(false);
            }}
          />
        ))}
      </MarkerClusterer>
      {clickMarker && <ParkingLotSimpleInfoModal parkingLotUuid="" />}
      <CurrentLocationButton onClick={setCurrentLocation} />
    </Map>
  );
}
