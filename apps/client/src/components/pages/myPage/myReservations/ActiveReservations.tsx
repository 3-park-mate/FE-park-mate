'use client';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getReservationsData } from '@/actions/reservation/reservation-service';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import MyReservationItem from './MyReservationItem';
import MyReservationItemSkeleton from './MyReservationItemSkeleton';
import { ReservationItemDataType } from '@/types/reservationDataTypes';

const PAGE_SIZE = 10;

export default function ActiveReservations() {
  const {
    items: reservations,
    isLoading,
    hasMore,
    loaderRef,
  } = useInfiniteScroll<ReservationItemDataType, number>({
    fetchData: async (cursor) => {
      const res = await getReservationsData({
        size: PAGE_SIZE,
        cursor,
        status: ['WAITING', 'CONFIRMED', 'IN_USE'],
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
        existing.map((item) => item.reservationCode)
      );
      return newItems.filter(
        (item) => !existingCodes.has(item.reservationCode)
      );
    },
  });

  if (isLoading && reservations.length === 0) {
    return (
      <PaddedSection className="pt-[84px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="pb-4">
            <MyReservationItemSkeleton />
            {index !== 4 && <hr className="mt-4" />}
          </div>
        ))}
      </PaddedSection>
    );
  }

  return (
    <PaddedSection className="pt-[84px]">
      {reservations.map((item, index) => (
        <div key={item.reservationCode} className="pb-4">
          <MyReservationItem data={item} />
          {index !== reservations.length - 1 && <hr className="mt-4" />}
        </div>
      ))}
      <div ref={loaderRef} className="pb-4 h-10">
        {isLoading && <MyReservationItemSkeleton />}
      </div>
      {reservations.length === 0 && !isLoading && !hasMore && (
        <p className="text-center text-gray-500">예약 내역이 없습니다.</p>
      )}
    </PaddedSection>
  );
}
