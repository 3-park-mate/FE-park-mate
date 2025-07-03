'use client';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import UsingInfoItem from './parkingInfo/UsingInfoItem';
import { getReservationsData } from '@/actions/reservation/reservation-service';
import { PAGE_SIZE } from '@/constants/constants';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { ReservationListItemDataType } from '@/types/reservationDataTypes';

export default function UsingStatusSection() {
  const {
    items: reservations,
    isLoading,
    hasMore,
    loaderRef,
  } = useInfiniteScroll<ReservationListItemDataType, number>({
    fetchData: async (cursor) => {
      const res = await getReservationsData({
        size: PAGE_SIZE,
        cursor,
        status: ['IN_USE'],
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

  return (
    <div className="space-y-6">
      {reservations.map((item) => (
        <UsingInfoItem
          key={item.reservationCode}
          parkingLotUuid={item.parkingLotUuid}
          parkingLotName={item.parkingLotName}
          parkingLotDistance={100}
          parkingSpotName={item.parkingSpotName}
          vehicleNumber={item.vehicleNumber}
          entryTime={item.entryTime}
          exitTime={item.exitTime}
        />
      ))}
      <div ref={loaderRef} className="pb-4 h-10">
        {isLoading && <DotSpinner className="mx-auto" />}
      </div>
      {reservations.length === 0 && !isLoading && !hasMore && (
        <p className="text-center text-gray-500 pb-10">
          이용중인 내역이 없습니다.
        </p>
      )}
    </div>
  );
}
