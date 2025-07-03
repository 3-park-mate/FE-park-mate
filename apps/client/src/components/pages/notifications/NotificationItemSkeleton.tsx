export default function NotificationItemSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-white animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>

      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
    </div>
  );
}
