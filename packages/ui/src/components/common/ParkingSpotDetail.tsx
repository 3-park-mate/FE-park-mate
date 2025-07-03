import MarkerIcon from '../icon/MarkerIcon';

export default function ParkingSpotDetail({
  name,
  parkingLotDistance,
  parkingSpotName,
}: {
  name: string;
  parkingLotDistance?: number;
  parkingSpotName: string;
}) {
  return (
    <>
      <p className="text-15px pb-0.5">{name}</p>
      <p className="flex items-center gap-1 text-gray-3 text-13px">
        <MarkerIcon size={12} className="text-gray-light-2" />{' '}
        {parkingLotDistance !== undefined && parkingLotDistance !== null
          ? `${parkingLotDistance}m · ${parkingSpotName}`
          : parkingSpotName}
      </p>
    </>
  );
}
