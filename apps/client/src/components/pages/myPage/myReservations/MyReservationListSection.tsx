'use client';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { ReservationItemDataType } from '@/types/reservationDataTypes';
import MyReservationItem from './MyReservationItem';
import { getReservationsData } from '@/actions/reservation/reservation-service';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useState } from 'react';
import { HomeTabMenu } from '../../home/HomeTabMenu';

const PAGE_SIZE = 10;

export default function MyReservationListSection() {
  const [tabMenu, setTabMenu] = useState<
    'reservationParking' | 'currentParking'
  >('reservationParking');

  const {
    items: reservations,
    isLoading,
    hasMore,
    loaderRef,
  } = useInfiniteScroll<ReservationItemDataType, number>({
    fetchData: async (cursor) => {
      const res = await getReservationsData({ size: PAGE_SIZE, cursor });
      if (res.success) {
        return {
          content: res.data.content,
          nextCursor: res.data.nextCursor,
          hasNext: res.data.hasNext,
        };
      }
      throw new Error('Failed to fetch reservation data');
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
    <>
      <ul className="fixed w-full max-w-[600px] flex justify-between bg-inner-background-gray z-50">
        <HomeTabMenu
          tabMenuName="이용 예정 및 진행 중"
          selected={tabMenu === 'reservationParking'}
          onClick={() => setTabMenu('reservationParking')}
        />
        <HomeTabMenu
          tabMenuName="이용 완료"
          selected={tabMenu === 'currentParking'}
          onClick={() => setTabMenu('currentParking')}
        />
      </ul>
      <PaddedSection className="pt-[84px]">
        {reservations.map((item, index) => (
          <div key={item.reservationCode} className="pb-4">
            <MyReservationItem data={item} />
            {index !== reservations.length - 1 && <hr className="mt-4" />}
          </div>
        ))}
        <div ref={loaderRef} className="h-10 pt-10 w-full flex justify-center">
          {isLoading && <DotSpinner />}
        </div>
        {reservations.length === 0 && !isLoading && !hasMore && (
          <p className="text-center text-gray-500">예약 내역이 없습니다.</p>
        )}
      </PaddedSection>
    </>
  );
}
