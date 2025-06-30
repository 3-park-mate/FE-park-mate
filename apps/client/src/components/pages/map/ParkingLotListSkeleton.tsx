export default function ParkingLotListSkeleton() {
  return (
    <div className="py-3 px-6 animate-pulse">
      <div className="flex items-start gap-3">
        {/* 이미지 스켈레톤 */}
        <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg"></div>

        {/* 텍스트 스켈레톤 */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* 가격 스켈레톤 */}
        <div className="flex-shrink-0 flex flex-col items-end gap-1">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
}
