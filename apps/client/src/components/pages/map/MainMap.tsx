'use client';

import { getCurrentCoordsUtil } from '@/utils/geolocationUtils';
import { useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  MarkerClusterer,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { markerDummyData } from '@/data/markerDummyData';
import { MarkerDataType } from '@/types/mapDataTypes';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { useSearchParams } from 'next/navigation';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });
  const searchParams = useSearchParams();

  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));

  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const [clickMarker, setClickMarker] = useState<string>('');
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const { setGnbNavBar } = useGnbNavBarStore();

  const getCurrentLocation = async (): Promise<{
    lat: number;
    lng: number;
  }> => {
    try {
      const { latitude, longitude } = await getCurrentCoordsUtil();
      return { lat: latitude, lng: longitude };
    } catch (error) {
      console.log(error);
      return { lat: 37.5714, lng: 126.9768 };
    } finally {
      console.log('finally');
    }
  };

  const initMap = async () => {
    if (lat && lng) {
      setCenter({ lat: lat, lng: lng });
    } else {
      const { lat, lng } = await getCurrentLocation();
      setCenter({ lat: lat, lng: lng });
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <Map
      center={center || { lat: 37.5727, lng: 126.9695 }}
      level={5}
      className="w-full h-screen z-0"
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
      {/* <CurrentLocationButton onClick={setCurrentLocation} /> */}
    </Map>
  );
}
