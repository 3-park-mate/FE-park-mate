// Re-export shared types for backward compatibility
export type {
  ParkingLotType,
  ParkingSpotType,
  ParkingSpotTypeWithEV,
  EVChargeType,
  ParkingLotResponseDataType,
  WeeklyOperationInfo,
  OperationsInfo,
  ParkingLotOptionDataType,
  GetParkingLotsInBoxRequestType,
  ParkingLotsInBoxResponseType,
  ParkingDetailDataType,
  ParkingSpotChargeType,
  ParkingCarouselItemDataType,
  ParkingLocationDataType,
  ParkingTimeDataType,
  ParkingQRDataType,
  AvailableSpotsResponseType,
  ParkingLotOption,
} from '@repo/shared-types';

// Import icon components for charging types configuration
import ACSingleIcon from '@repo/ui/components/icon/ACSingleIcon';
import ACThreePhaseIcon from '@repo/ui/components/icon/ACThreePhaseIcon';
import DCChademoIcon from '@repo/ui/components/icon/DCChademoIcon';
import DCComboIcon from '@repo/ui/components/icon/DCComboIcon';

// Charging types configuration with icons
export const chargingTypes = [
  { key: 'AC_SINGLE', icon: ACSingleIcon, label: 'AC단상' },
  { key: 'AC_THREE_PHASE', icon: ACThreePhaseIcon, label: 'AC3상' },
  { key: 'DC_CHADEMO', icon: DCChademoIcon, label: 'DC차데모' },
  { key: 'DC_COMBO', icon: DCComboIcon, label: 'DC콤보' },
];
