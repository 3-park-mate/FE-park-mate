'use client';

import { Sheet } from '@repo/ui/components/base/sheet';
import { useEffect, useState } from 'react';
import CheckAvailableSpotsContent, {
  AvailableSpotsResponseType,
} from './CheckAvailableSpotsContent';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { useFormContext } from 'react-hook-form';
import { getAvailableSpots } from '@/actions/parking/parking-service';
import { toLocalISOString } from '@/utils/datetimeUtils';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';

export default function CheckAvailableSpotsSheet({
  open,
  onOpenChange,
  parkingLotUuid,
  onOpenConfirm,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  parkingLotUuid: string;
  onOpenConfirm: () => void;
}) {
  const { watch } = useFormContext<CreateReservationRequestType>();
  const schedule = watch('schedule');

  const [availableSpots, setAvailableSpots] =
    useState<AvailableSpotsResponseType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAvailableSpots = async () => {
    if (schedule.entryDateTime === null || schedule.exitDateTime === null)
      return;
    setLoading(true);
    try {
      const res = await getAvailableSpots(
        parkingLotUuid,
        toLocalISOString(schedule.entryDateTime),
        toLocalISOString(schedule.exitDateTime)
      );

      setAvailableSpots(res.success ? res.data : {});
    } catch (err) {
      console.error('잔여 주차면 조회 실패:', err);
      setAvailableSpots({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchAvailableSpots();
    }
  }, [open]);

  if (loading) return <DotSpinner />;

  return (
    <Sheet key="bottom" open={open} onOpenChange={onOpenChange}>
      <CheckAvailableSpotsContent
        availableSpots={availableSpots}
        onClickReserve={() => {
          onOpenChange(false);
          onOpenConfirm();
        }}
      />
    </Sheet>
  );
}
