'use client';

import { Sheet } from '@repo/ui/components/base/sheet';
import { useEffect, useState } from 'react';
import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { useFormContext } from 'react-hook-form';
import { getAvailableSpots } from '@/actions/parking/parking-service';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import CheckAvailableSpotsContent from './CheckAvailableSpotsContent';
import { AvailableSpotsResponseType } from '@/types/parkingDataTypes';

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
  const entryTime = watch('entryTime');
  const exitTime = watch('exitTime');

  const [availableSpots, setAvailableSpots] =
    useState<AvailableSpotsResponseType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAvailableSpots = async () => {
    if (entryTime === null || exitTime === null) return;
    setLoading(true);
    try {
      const res = await getAvailableSpots(parkingLotUuid, entryTime, exitTime);

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
