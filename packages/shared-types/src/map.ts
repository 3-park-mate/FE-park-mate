import { Coordinates, LocationData } from './common';

// Map Types
export interface MapBounds {
  maxlat: number | null;
  minlat: number | null;
  maxlng: number | null;
  minlng: number | null;
}

export interface MapCenter extends LocationData {}

// Parking Lot Simple Info for Map
export interface ParkingLotSimpleInfoType {
  parkingLotUuid: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  thumbnailUrl?: string;
  baseFee: number;
  averageRating: number;
  availableSpots: number;
  totalSpots: number;
  isEvChargingAvailable: boolean;
  parkingSpotTypes: string[];
  evChargeTypes: string[];
}

// Map Filter Types
export interface MapFilterData {
  schedule?: {
    entryTime: string | null;
    exitTime?: string | null;
  };
  mapCenter?: MapCenter;
  mapBounds?: MapBounds;
  evcharge?: number;
}

// Map Marker Types
export interface MapMarkerData {
  id: string;
  position: Coordinates;
  title: string;
  content?: string;
  icon?: string;
  onClick?: () => void;
}

// Map Search Types
export interface MapSearchParams {
  query: string;
  bounds?: MapBounds;
  center?: MapCenter;
}

// Map Route Types
export interface MapRouteData {
  origin: Coordinates;
  destination: Coordinates;
  waypoints?: Coordinates[];
  travelMode: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT';
}
