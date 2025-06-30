// Re-export shared types for backward compatibility
export type {
  AddParkingLotDataType,
  AddParkingLotStoreDataType,
  ParkingLotType,
  ParkingLotForm,
  ParkingLotStoreForm,
  EVChargeType,
  ChargeableParkingSpot,
  ParkingSpotType,
  NonChargeableParkingSpot,
} from '@repo/shared-types';

// Legacy type alias for backward compatibility
export type EVChargeTypeString =
  | 'AC_SINGLE'
  | 'DC_COMBO'
  | 'DC_CHADEMO'
  | 'AC_THREE_PHASE';
