// Re-export shared types for backward compatibility
export type {
  MapBounds,
  MapCenter,
  ParkingLotSimpleInfoType,
  MapFilterData,
  MapMarkerData,
  MapSearchParams,
  MapRouteData,
} from '@repo/shared-types';

export interface MarkerDataType {
  parkingLotUuid: string;
  availableSpots: number;
  latitude: number;
  longitude: number;
}

export interface MapInfo {
  center?: {
    lat: number;
    lng: number;
  };
  bounds?: {
    swLat: number;
    swLng: number;
    neLat: number;
    neLng: number;
  };
  level?: number;
}
