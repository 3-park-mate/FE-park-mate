export interface ReservationInfoBoxProps {
  id?: string;
  boxName?: string;
  buttonName?: string;
  isExpanded?: boolean;
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
