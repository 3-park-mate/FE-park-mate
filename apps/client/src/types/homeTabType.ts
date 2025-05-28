export interface HomeTabType {
  tabMenuName: string;
  onClick?: () => void;
  selected?: boolean;
}

export interface HomeTabBarProps {
  children: {
    reservationParking: React.ReactNode;
    currentParking: React.ReactNode;
  };
}
