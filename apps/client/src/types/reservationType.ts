//

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

//

// 주차장 uuid + 전기차 여부로 요청
export interface GetAvailableDayReponse {
  day: string[];
}

// 주차장 uuid + 전기차 여부 + 날짜로 요청
export interface GetAvailableTimeReponse {
  time: string[];
}
