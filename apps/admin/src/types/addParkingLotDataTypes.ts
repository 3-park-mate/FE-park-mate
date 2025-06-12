export interface AddParkingLotDataType {
  parkingLot: {
    hostUuid: string;
    parkingLotType: string;
    name: string;
    phoneNumber: string;
    capacity: number;
    registeredCapacity: number;
    zoneCode: string;
    mainAddress: string;
    detailAddress: string;
    latitude: number;
    longitude: number;
    extraInfo: string;
  };
  parkingSpot: {
    chargeable: {
      parkingSpotType: string;
      evChargeTypes: string[];
    }[];
    nonChargeable: {
      parkingSpotType: 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';
      count: number;
    }[];
  };
  parkingLotImage: {
    imageUrls: string[];
  };
}

export interface AddParkingLotStoreDataType {
  parkingLot: ParkingLotForm;
  parkingLotImage: { imageUrls: string[] };
  parkingSpot: {
    chargeable?: ChargeableParkingSpot[];
    nonChargeable: NonChargeableParkingSpot[];
  };
}

export interface ParkingLotForm {
  name: string;
  // capacity: number;
  // registeredCapacity: number;
  zoneCode: string;
  mainAddress: string;
  detailAddress: string;
  // latitude: number;
  // longitude: number;
  extraInfo: string;
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

export interface NonChargeableParkingSpot {
  parkingSpotType: 'SMALL' | 'COMPACT' | 'STANDARD' | 'LARGE';
  count: number;
}
