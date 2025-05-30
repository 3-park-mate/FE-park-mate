import MarkerIcon from '../icon/MarkerIcon';

export default function ParkingSpotDetail({
  name,
  locations,
}: {
  name: string;
  locations: string;
}) {
  return (
    <>
      <p className="text-15px pb-0.5">{name}</p>
      <p className="flex items-center gap-1 text-gray-3 text-13px">
        <MarkerIcon size={12} className="text-gray-light-2" /> {locations}
      </p>
    </>
  );
}
