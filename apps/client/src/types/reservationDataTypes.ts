export type ReservationStatus =
  | 'WAITING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'IN_USE'
  | 'COMPLETED';

export type PaymentType = 'PG' | 'POINT';

export interface ReservationItemDataType {
  reservationCode: string;
  userUuid: string;
  parkingLotThumbnailUrl: string;
  parkingSpotId: number;
  parkingSpotName: string;
  parkingLotUuid: string;
  parkingLotName: string;
  vehicleNumber: string;
  entryTime: string;
  exitTime: string;
  amount: number;
  status: ReservationStatus;
  paymentType: PaymentType;
}

export interface ReservationListResponse {
  content: ReservationItemDataType[];
  hasNext: boolean;
  nextCursor: number;
}

export interface ReservationCancelDataType {
  reservationCode: string;
  cancelReason: string;
}
