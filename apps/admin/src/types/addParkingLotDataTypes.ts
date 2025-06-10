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
      parkingSpotType: 'SMALL' | 'STANDARD' | 'LARGE';
      count: number;
    }[];
  };
  parkingLotImage: {
    imageUrls: string[];
  };
}

export interface AddParkingLotStoreDataType {
  parkingLot: ParkingLotForm;
  // parkingSpot: {
  //   chargeable: ChargeableParkingSpot[];
  //   nonChargeable: NonChargeableParkingSpot[];
  // };
  // parkingLotImage: { imageUrls: string[] };
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

export interface ChargeableParkingSpot {
  parkingSpotType: string;
  evChargeTypes: string[];
}

export interface NonChargeableParkingSpot {
  parkingSpotType: 'SMALL' | 'STANDARD' | 'LARGE';
  count: number;
}
