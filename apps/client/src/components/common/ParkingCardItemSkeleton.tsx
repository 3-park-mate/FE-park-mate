export default function ParkingCardItemSkeleton() {
  return (
    <div>
      <div
        className="relative rounded-md overflow-hidden 
        bg-gray-1 flex aspect-[3/2] mb-2 animate-pulse"
      ></div>
      <div className="inline-block w-4/5 h-5 bg-gray-200 rounded-md mb-1 animate-pulse"></div>
      <div className="w-3/4 h-5 bg-gray-200 rounded-md animate-pulse"></div>
    </div>
  );
}
