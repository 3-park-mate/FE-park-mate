import { Coordinates, OptionData, ImageData, BaseFormData } from './common';
import { ParkingLotSimpleInfoType } from './map';

// Parking Lot Types
export type ParkingLotType = 'PUBLIC' | 'PRIVATE' | 'COMMERCIAL';

export type ParkingSpotType = 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';

export type ParkingSpotTypeWithEV = 'EV' | ParkingSpotType;

export type EVChargeType =
  | 'AC_SINGLE'
  | 'DC_COMBO'
  | 'DC_CHADEMO'
  | 'AC_THREE_PHASE';

// Base Parking Lot Form
export interface BaseParkingLotForm {
  name: string;
  phoneNumber: string;
  capacity: number;
  registeredCapacity: number;
  mainAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  isEvChargingAvailable: boolean;
  extraInfo: string;
}

// Admin Parking Lot Types
export interface ParkingLotForm extends BaseParkingLotForm {
  hostUuid: string;
  parkingLotType: ParkingLotType;
  thumbnailUrl: string;
}

export interface ParkingLotStoreForm extends BaseParkingLotForm {
  hostUuid: string;
  parkingLotType: ParkingLotType;
}

// Client Parking Lot Types
export interface ParkingLotResponseDataType extends BaseFormData {
  parkingLotUuid: string;
  hostUuid: string;
  thumbnailUrl?: string;
  name: string;
  phoneNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  parkingLotType: ParkingLotType;
  parkingSpotTypes: ParkingSpotType[];
  evChargeTypes: EVChargeType[];
  extraInfo: string;
  imageUrls: { imageUrl: string }[];
  options: OptionData[];
  likeCount: number;
  dislikeCount: number;
}

// Parking Spot Types
export interface ChargeableParkingSpot {
  parkingSpotType: 'EV';
  evChargeTypes?: EVChargeType[];
}

export interface NonChargeableParkingSpot {
  parkingSpotType: ParkingSpotType;
  count: number;
}

// Parking Operation Types
export interface OperationDataType extends BaseFormData {
  parkingOperationUuid: string;
  parkingLotUuid: string;
  operationDate: string;
  validStartTime: string;
  validEndTime: string;
  baseIntervalMinutes: number;
  baseFee: number;
  extraIntervalMinutes: number;
  extraFee: number;
  discountPercent: number;
  isActive: boolean;
}

export interface OperationStoreDataType {
  validStartTime: string;
  validEndTime: string;
  baseIntervalMinutes: number;
  baseFee: number;
  extraIntervalMinutes: number;
  extraFee: number;
  discountPercent: number;
  isActive: boolean;
}

export interface WeeklyOperationInfo {
  dayOfWeek: string;
  dayOfMonth: number;
  startTime?: string;
  endTime?: string;
}

export interface OperationsInfo {
  parkingOperationUuid: string;
  parkingLotUuid: string;
  operationDate: string;
  validStartTime: string;
  validEndTime: string;
  baseIntervalMinutes: number;
  baseFee: number;
  extraIntervalMinutes: number;
  extraFee: number;
  discountRate: number;
}

// Parking Lot Options
export interface ParkingLotOptionDataType extends OptionData {}

// Add Parking Lot Types
export interface AddParkingLotStoreDataType {
  parkingLot: ParkingLotStoreForm;
  optionIds: number[];
  parkingSpot: {
    chargeable?: ChargeableParkingSpot[];
    nonChargeable: NonChargeableParkingSpot[];
  };
  parkingLotImage: {
    images: File[];
  };
}

export interface AddParkingLotDataType {
  parkingLot: ParkingLotForm;
  optionIds: number[];
  parkingSpot: {
    chargeable?: ChargeableParkingSpot[];
    nonChargeable: NonChargeableParkingSpot[];
  };
  parkingLotImage: {
    imageUrls: { imageUrl: string }[];
  };
}

// Parking Lot List Types
export interface ParkingLotItem {
  parkingLotUuid: string;
  name: string;
  address: string;
  thumbnailUrl?: string;
  isActive: boolean;
  parkingLotType: ParkingLotType;
}

// Parking Lot Search Types
export interface GetParkingLotsInBoxRequestType {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
  isEvChargingAvailable: boolean;
  startDateTime?: string;
  endDateTime?: string;
}

export interface ParkingLotsInBoxResponseType {
  parkingLots: ParkingLotSimpleInfoType[];
}

// Parking Lot Detail Types
export interface ParkingDetailDataType {
  hostUuid: string;
  parkingLotType: string;
  name: string;
  parkingCapacity: number;
  registeredParkingCount: number;
  zoneCode: string;
  mainAddress: string;
  detailAddress: string;
  evChargingAvailable: boolean;
  phoneNumber: string;
  extraInfo: string;
  imageUrls: string[];
  parkingSpotChargeTypeList: ParkingSpotChargeType[];
}

export interface ParkingSpotChargeType {
  chargeTypeId: number;
  chargeTypeName: string;
}

// Parking Lot Carousel Types
export interface ParkingCarouselItemDataType {
  parkingLotUuid: string;
  name: string;
  distance: number;
  thumbnailUrl: string;
  baseFee: number;
  averageRating: number;
}

// Parking Location Types
export interface ParkingLocationDataType {
  parkingLotUuid: string;
  parkingLotName: string;
  parkingLotDistance: number;
  parkingSpotName: string;
  vehicleNumber: string;
}

// Parking Time Types
export interface ParkingTimeDataType {
  entryTime: string;
  exitTime: string;
}

// Parking QR Types
export interface ParkingQRDataType {
  parkingLotUuid: string;
  entryTime: string;
  exitTime: string;
  parkingSpotName: string;
  vehicleNumber: string;
}

// Available Spots Types
export interface AvailableSpotsResponseType {
  availableSpots: number;
  totalSpots: number;
}

// Charging Types Configuration
export const chargingTypes = [
  { key: 'AC_SINGLE' as const, label: 'AC단상' },
  { key: 'AC_THREE_PHASE' as const, label: 'AC3상' },
  { key: 'DC_CHADEMO' as const, label: 'DC차데모' },
  { key: 'DC_COMBO' as const, label: 'DC콤보' },
] as const;

// Parking Lot Option Map
export interface ParkingLotOption {
  name: string;
  label: string;
}
