'use client';
import ParkingCardItem from '@/components/common/ParkingCardItem';
import ParkingCardItemSkeleton from '@/components/common/ParkingCardItemSkeleton';
import { PAGE_SIZE } from '@/constants/constants';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { ParkingLotSimpleDataType } from '@/types/parkingDataTypes';
import { fetchCombinedFavoriteParkingLots } from '@/actions/user/user-service';

export default function FavoriteListSection() {
  const {
    items: favoriteParkingLots,
    isLoading,
    hasMore,
    loaderRef,
  } = useInfiniteScroll<ParkingLotSimpleDataType, number>({
    fetchData: async (cursor) => {
      const result = await fetchCombinedFavoriteParkingLots({
        size: PAGE_SIZE,
        cursor,
      });
      return {
        content: result.content,
        nextCursor: result.nextCursor,
        hasNext: result.hasNext,
      };
    },
    filterDuplicateItems: (existing, newItems) => {
      const existingUuids = new Set(
        existing.map((item) => item.parkingLotUuid)
      );
      return newItems.filter((item) => !existingUuids.has(item.parkingLotUuid));
    },
  });

  if (isLoading && favoriteParkingLots.length === 0) {
    return (
      <PaddedSection className="grid grid-cols-2 gap-4 py-4">
        {Array.from({ length: PAGE_SIZE }).map((_, index) => (
          <ParkingCardItemSkeleton key={index} />
        ))}
      </PaddedSection>
    );
  }

  return (
    <>
      <PaddedSection className="grid grid-cols-2 gap-4 py-4">
        {favoriteParkingLots.map((parkingLotData) => (
          <ParkingCardItem
            key={parkingLotData.parkingLotUuid}
            parkingLotData={parkingLotData}
          />
        ))}
        <div ref={loaderRef} className="pb-4 h-10">
          {isLoading && <ParkingCardItemSkeleton />}
        </div>
      </PaddedSection>
      {favoriteParkingLots.length === 0 && !isLoading && !hasMore && (
        <p className="text-center text-gray-500">
          즐겨찾기한 주차장이 없습니다.
        </p>
      )}
    </>
  );
}
