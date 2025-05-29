import NearestParking from './NearestParking';
import ParkingInfoItem from './parkingInfo/ParkingInfoItem';
import ParkPointArea from './ParkPointArea';

export default function UsageStatusSection() {
  return (
    <div className="space-y-6">
      <ParkingInfoItem />
      <ParkPointArea />
      <NearestParking />
    </div>
  );
}
