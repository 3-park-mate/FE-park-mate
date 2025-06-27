import {
  EVChargeType,
  ParkingLotOption,
  ParkingSpotType,
} from '@/types/parkingDataTypes';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import EvChargeTypeSection from './EvChargeTypeSection';
import ParkingLotOptionSection from './ParkingLotOptionSection';
import ParkingSpotTypeSection from './ParkingSpotTypeSection';

export default function OptionSection({
  options,
  evChargeTypes,
  parkingSpotTypes,
}: {
  options: ParkingLotOption[];
  evChargeTypes: EVChargeType[];
  parkingSpotTypes: ParkingSpotType[];
}) {
  return (
    <PaddedSection className="bg-white py-7 mb-3" id="options">
      <ParkingLotOptionSection options={options} />
      <hr className="my-6" />
      {evChargeTypes?.length > 0 && (
        <EvChargeTypeSection evChargeTypes={evChargeTypes} />
      )}
      <hr className="my-6" />
      {parkingSpotTypes?.length > 0 && (
        <ParkingSpotTypeSection parkingSpotTypes={parkingSpotTypes} />
      )}
    </PaddedSection>
  );
}
