export default function MyReservationItemSkeleton() {
  return (
    <div className="flex justify-between items-center animate-pulse">
      <div className="flex flex-col flex-grow">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-1.5"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-1.5"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end gap-2">
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
        <div className="h-5 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
}
