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
