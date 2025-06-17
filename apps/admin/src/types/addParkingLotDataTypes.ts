export interface AddParkingLotDataType {
  parkingLot: {
    hostUuid: string;
    parkingLotType: 'PUBLIC' | 'PRIVATE' | 'COMMERCIAL';
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
  };
  optionIds: number[];
  parkingSpot: {
    chargeable: ChargeableParkingSpot[];
    nonChargeable: NonChargeableParkingSpot[];
  };
  parkingLotImage: {
    imageUrls: {
      imageUrl: string;
    }[];
  };
}

export interface AddParkingLotStoreDataType {
  parkingLot: ParkingLotForm;
  optionIds: number[];
  parkingLotImage: {
    imageUrls: {
      imageUrl: string;
    }[];
  };
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
  latitude: number;
  longitude: number;
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
