'use client';

import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { useEffect, useRef, useState } from 'react';
import MyReservationItem from './MyReservationItem';
import { ReservationItemDataType } from '@/types/reservationDataTypes';
import { getReservationsData } from '@/actions/reservation/reservation-service';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';

export default function MyReservationListSection({
  reservations: initialReservations,
}: {
  reservations: ReservationItemDataType[];
}) {
  const [reservations, setReservations] = useState(initialReservations);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !isLoading && hasMore) {
          fetchMoreReservations();
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isLoading, hasMore, cursor]);

  const fetchMoreReservations = async () => {
    setIsLoading(true);
    const res = await getReservationsData({ size: 10, cursor });

    if (res.success) {
      setReservations((prev) => [...prev, ...res.data.content]);
      setCursor(res.data.nextCursor);
      setHasMore(res.data.hasNext);
    }

    setIsLoading(false);
  };

  return (
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
    </PaddedSection>
  );
}
