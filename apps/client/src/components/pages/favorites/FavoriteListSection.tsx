'use client';
import { getFavoritesData } from '@/actions/user/user-service';
import ParkingCardItem from '@/components/common/ParkingCardItem';
import ParkingCardItemSkeleton from '@/components/common/ParkingCardItemSkeleton';
import { PAGE_SIZE } from '@/constants/constants';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';

export default function FavoriteListSection() {
  const {
    items: favoriteDatas,
    isLoading,
    hasMore,
    loaderRef,
  } = useInfiniteScroll<{ parkingLotUuid: string }, number>({
    fetchData: async (cursor) => {
      const res = await getFavoritesData({
        size: PAGE_SIZE,
        cursor,
      });
      if (res.success) {
        return {
          content: res.data.content,
          nextCursor: res.data.nextCursor,
          hasNext: res.data.hasNext,
        };
      }
      throw new Error('Failed to fetch');
    },
    filterDuplicateItems: (existing, newItems) => {
      const existingCodes = new Set(
        existing.map((item) => item.parkingLotUuid)
      );
      return newItems.filter((item) => !existingCodes.has(item.parkingLotUuid));
    },
  });

  if (isLoading && favoriteDatas.length === 0) {
    return (
      <PaddedSection className="grid grid-cols-2 gap-4 py-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ParkingCardItemSkeleton key={index} />
        ))}
      </PaddedSection>
    );
  }

  return (
    <PaddedSection className="grid grid-cols-2 gap-4 py-4">
      {favoriteDatas.map((item, index) => (
        <ParkingCardItem key={index} parkingLotUuid={item.parkingLotUuid} />
      ))}
      <div ref={loaderRef} className="pb-4 h-10">
        {isLoading && <ParkingCardItemSkeleton />}
      </div>
      {favoriteDatas.length === 0 && !isLoading && !hasMore && (
        <p className="text-center text-gray-500">
          즐겨찾기한 주차장이 없습니다.
        </p>
      )}
    </PaddedSection>
  );
}
