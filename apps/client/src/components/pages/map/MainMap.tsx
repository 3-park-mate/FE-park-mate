'use client';

import { useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import ParkingLotSimpleInfoModal from './ParkingLotSimpleInfoModal';
import AlertModal from '@repo/ui/components/common/AlertModal';
import CurrentLocationButton from './CurrentLocationButton ';
import MapMarkers from './MapMarkers';
import useMapCenter from '@/hooks/useMapCenter';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { useLocationAlertStore } from '@/store/useLocationAlertStore';

export default function MainMap() {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [clickMarker, setClickMarker] = useState<string>('');
  const { openAlert, setOpenAlert } = useLocationAlertStore();
  const { center, initMap, handleMapChange } = useMapCenter();
  const { setGnbNavBar } = useGnbNavBarStore();

  return (
    <>
      <AlertModal
        open={openAlert}
        onOpenChange={setOpenAlert}
        errorMessage={'위치 접근 권한을 허용해주세요'}
        theme="primary"
        showCancelButton
      />
      <Map
        center={center}
        level={5}
        className="w-full h-screen z-0"
        onDragEnd={handleMapChange}
        onZoomChanged={handleMapChange}
        onClick={() => {
          setClickMarker('');
          setGnbNavBar(true);
        }}
        isPanto
      >
        <MapMarkers clickMarker={clickMarker} setClickMarker={setClickMarker} />
        {clickMarker && <ParkingLotSimpleInfoModal parkingLotUuid="" />}
        <CurrentLocationButton onClick={initMap} />
      </Map>
    </>
  );
}
