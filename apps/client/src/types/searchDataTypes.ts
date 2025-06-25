export interface TabMenuWithIconType {
  id: string;
  title: string;
  href?: string;
  icon?: React.FC<{ className?: string; onClick?: () => void }>;
}

export interface SearchLocationResultType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  road_address_name: string;
}
