import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';

export default function ReviewItemSkeleton() {
  return (
    <PaddedLayout className="py-4 bg-white rounded-lg">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-1/8 mb-3 animate-pulse"></div>

      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-11/12 mb-2 animate-pulse"></div>

      <div className="flex items-center justify-between pt-5 animate-pulse">
        <div className="flex space-x-2">
          <div className="h-6 w-12 bg-gray-200 rounded"></div>
          <div className="h-6 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </PaddedLayout>
  );
}
