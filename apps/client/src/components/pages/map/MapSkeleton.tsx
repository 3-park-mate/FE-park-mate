export default function MapSkeleton() {
  return (
    <div className="absolute w-full h-full z-0 bg-gray-100 animate-pulse">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
