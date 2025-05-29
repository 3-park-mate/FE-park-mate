export interface ReservationInfoBoxProps {
  id?: keyof FilterInfoType;
  boxName?: string;
  buttonName?: string;
  isExpanded?: boolean;
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface searchLocationResultType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  road_address_name: string;
}

export interface SearchResultsListProps {
  searchResults: searchLocationResultType[];
  setSearchResults: (results: searchLocationResultType[]) => void;
  setInputValue: (value: string) => void;
}

export interface FilterInfoType {
  schedule?: {
    entryTime: string;
    exitTime?: string;
  };
  mapCenter?: {
    lat: number;
    lng: number;
    locationName?: string;
  };
  evcharge?: number;
}
