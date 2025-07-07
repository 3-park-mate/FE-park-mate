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

export interface ParkingLotSimpleInfoType {
  parkingLotUuid: string;
  name: string;
  address?: string;
  thumbnailUrl: string | null;
  imageUrls: {
    imageUrl: string;
  }[];
  latitude: number;
  longitude: number;
  distance: number;
  availableSpotCount: number;
}

export interface ParkingLotSimpleInfoWithRatingType {
  parkingLotUuid: string;
  name: string;
  address?: string;
  thumbnailUrl: string | null;
  imageUrls: {
    imageUrl: string;
  }[];
  latitude: number;
  longitude: number;
  distance: number;
  availableSpotCount: number;
  rating: number;
}

export interface ParkingLotSimpleInfoWithReviewType {
  parkingLotUuid: string;
  name: string;
  address?: string;
  thumbnailUrl: string | null;
  imageUrls: {
    imageUrl: string;
  }[];
  latitude: number;
  longitude: number;
  distance: number;
  availableSpotCount: number;
  rating: number;
  totalReviews: number;
}

export interface initMapProps {
  parkingLotUuid: string;
  lat: number;
  lng: number;
  ev: boolean;
  entry: string;
  exit: string;
}
