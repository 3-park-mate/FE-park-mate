export interface ParkingLocationDataType {
  parkingLotUuid: string;
  parkingLotName: string;
  parkingLotDistance: number;
  parkingSpotName: string;
  vehicleNumber: string;
}

export interface ParkingTimeDataType {
  entryTime: string;
  exitTime: string;
}

export interface ParkingCarouselItemDataType {
  parkingLotUuid: string;
  name: string;
  thumbnailUrl: string;
  averageRating: number;
  isOperating: boolean;
}

export interface ReviewSummaryType {
  averageRating: number;
  totalReviews: number;
}
