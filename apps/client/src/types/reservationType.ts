export interface ReservationInfoBoxProps {
  id?: string;
  boxName?: string;
  buttonName?: string;
  isExpanded?: boolean;
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface ReservationInfoItemDataType {
  parkingLotUuid: string;
  parkingLotName: string;
  parkingSpotName: string;
  entryTime: string;
  exitTime: string;
  vehicleNumber: string;
}
