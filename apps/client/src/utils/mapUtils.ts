import { useParkingFilterStore } from '@/store/useParkingFilterStore';

export const updateMapInfoUtil = (map: kakao.maps.Map) => {
  const parkingFilter = useParkingFilterStore((state) => state);

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
};
