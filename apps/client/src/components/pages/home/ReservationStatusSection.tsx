'use client';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ReservationInfoItem from './parkingInfo/ReservationInfoItem';
import { ReservationItemDataType } from '@/types/reservationDataTypes';
import { getReservationsData } from '@/actions/reservation/reservation-service';
import { PAGE_SIZE } from '@/constants/constants';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';

export default function ReservationStatusSection() {
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
        status: ['WAITING', 'CONFIRMED'],
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
        <ReservationInfoItem
          key={item.reservationCode}
          parkingLotUuid={item.parkingLotUuid}
          parkingLotName={item.parkingLotName}
          parkingSpotName={item.parkingSpotName}
          entryTime={item.entryTime}
          exitTime={item.exitTime}
          vehicleNumber={item.vehicleNumber}
        />
      ))}
      <div ref={loaderRef} className="pb-4 h-10">
        {isLoading && <DotSpinner className="mx-auto" />}
      </div>
      {reservations.length === 0 && !isLoading && !hasMore && (
        <p className="text-center text-gray-500 pb-10">예약 내역이 없습니다.</p>
      )}
    </div>
  );
}
