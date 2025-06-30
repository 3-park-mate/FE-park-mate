import { BaseFormData } from './common';

// Reservation Status Types
export type ReservationStatus =
  | 'WAITING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'IN_USE'
  | 'COMPLETED';

// Reservation Types
export interface ReservationDataType extends BaseFormData {
  reservationUuid: string;
  parkingLotUuid: string;
  userUuid: string;
  parkingSpotName: string;
  vehicleNumber: string;
  entryTime: string;
  exitTime: string;
  totalFee: number;
  status: ReservationStatus;
  reservationCode: string;
}

export interface ReservationRequestDataType {
  parkingLotUuid: string;
  parkingSpotName: string;
  vehicleNumber: string;
  entryTime: string;
  exitTime: string;
}

export interface ReservationResponseDataType {
  reservationUuid: string;
  reservationCode: string;
  totalFee: number;
  status: ReservationStatus;
}

// Reservation History Types
export interface ReservationHistoryItem {
  reservationUuid: string;
  parkingLotName: string;
  parkingSpotName: string;
  entryTime: string;
  exitTime: string;
  totalFee: number;
  status: ReservationStatus;
  reservationCode: string;
}

// Reservation Status Badge Types
export interface ReservationStatusBadge {
  label: string;
  className: string;
}

// Reservation Filter Types
export interface ReservationFilterParams {
  status?: ReservationStatus;
  startDate?: string;
  endDate?: string;
  parkingLotUuid?: string;
}

// Reservation Payment Types
export interface ReservationPaymentData {
  reservationUuid: string;
  amount: number;
  paymentMethod: 'POINT' | 'CARD' | 'CASH';
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
}

// Reservation QR Types
export interface ReservationQRData {
  reservationUuid: string;
  reservationCode: string;
  parkingLotName: string;
  parkingSpotName: string;
  entryTime: string;
  exitTime: string;
  vehicleNumber: string;
}
