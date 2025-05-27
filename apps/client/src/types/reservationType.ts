import { FilterInfoType } from '@/components/pages/reservation/ReservationInfoSection';

export interface ReservationInfoBoxProps {
  id?: keyof FilterInfoType;
  boxName?: string;
  buttonName?: string;
  isExpanded?: boolean;
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  filterInfo: FilterInfoType;
}
