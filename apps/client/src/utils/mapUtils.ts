export const updateMapState = (
  map: kakao.maps.Map,
  setMapCenter: (lat: number, lng: number, locationName: string | null) => void,
  setMapBounds: (
    neLat: number,
    swLat: number,
    neLng: number,
    swLng: number
  ) => void
) => {
  const center = map.getCenter();
  const bounds = map.getBounds();
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  setMapCenter(center.getLat(), center.getLng(), null);
  setMapBounds(ne.getLat(), sw.getLat(), ne.getLng(), sw.getLng());
};
