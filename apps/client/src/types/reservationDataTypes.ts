import { ParkingSpotTypeWithEV } from './parkingDataTypes';

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

export interface ReservationListItemDataType {
  reservationCode: string;
  parkingSpotName: string;
  parkingLotUuid: string;
  parkingLotName: string;
  vehicleNumber: string;
  amount: number;
  entryTime: string;
  exitTime: string;
  status: ReservationStatus;
}

export interface ReservationListResponse {
  content: ReservationListItemDataType[];
  hasNext: boolean;
  nextCursor: number;
}

export interface ReservationCancelDataType {
  reservationCode: string;
  cancelReason: string;
}

export interface CreateReservationRequestType {
  parkingLotUuid: string;
  parkingSpotType: ParkingSpotTypeWithEV;
  entryTime: string;
  exitTime: string;
  amount: number;
  vehicleNumber: string;
}

export interface CreateReservationResponseType {
  reservationCode: string;
}
