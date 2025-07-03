export interface HomeMenuDataType {
  icon: string;
  label: string;
  href: string;
}

export interface MyPageMenuDataType {
  label: string;
  href: string;
}

export interface GnbMenuType {
  menuName: string;
  main?: boolean;
  link: string;
  icon: React.FC<{ className?: string; onClick?: () => void }>;
}

export interface HomeTabType {
  tabMenuName: string;
  onClick?: () => void;
  selected?: boolean;
}

export interface HomeTabBarProps {
  tabContents: {
    reservationParking: React.ReactNode;
    currentParking: React.ReactNode;
  };
}

export interface ParkingDatailTabMenuType {
  label: string;
  id: string;
}

export interface ScheduleType {
  entryDateTime: Date | null;
  exitDateTime: Date | null;
}
