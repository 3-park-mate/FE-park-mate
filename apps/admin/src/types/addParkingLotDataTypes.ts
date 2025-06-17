export interface AddParkingLotDataType {
  parkingLot: ParkingLotForm;
  optionIds: number[];
  parkingSpot: {
    chargeable?: ChargeableParkingSpot[];
    nonChargeable: NonChargeableParkingSpot[];
  };
  parkingLotImage: {
    imageUrls: {
      imageUrl: string;
    }[];
  };
}

export type ParkingLotType = 'PUBLIC' | 'PRIVATE' | 'COMMERCIAL';

export interface ParkingLotForm {
  hostUuid: string;
  parkingLotType: ParkingLotType;
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
  thumbnailUrl: string;
}

export type EVChargeTypeString =
  | 'AC_SINGLE'
  | 'DC_COMBO'
  | 'DC_CHADEMO'
  | 'AC_THREE_PHASE';

export interface ChargeableParkingSpot {
  parkingSpotType: 'EV';
  evChargeTypes?: EVChargeTypeString[];
}

export type ParkingSpotType = 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';

export interface NonChargeableParkingSpot {
  parkingSpotType: ParkingSpotType;
  count: number;
}
