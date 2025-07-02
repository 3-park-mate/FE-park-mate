'use client';

import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { FormProvider, useForm } from 'react-hook-form';
import SelectScheduleSection from '../check-availability/SelectScheduleSection';
import CheckAvailableSpotsSheet from '../check-availability/CheckAvailableSpotsSheet';
import { useState } from 'react';
import ReservationConfirmSheet from './ReservationConfirmSheet';
import { ParkingLotResponseDataType } from '@/types/parkingDataTypes';

export default function ReservationForm({
  parkingLotUuid,
  parkingLotData,
}: {
  parkingLotUuid?: string;
  parkingLotData: ParkingLotResponseDataType;
}) {
  const methods = useForm<CreateReservationRequestType>({
    defaultValues: {
      schedule: { entryDateTime: null, exitDateTime: null },
      parkingSpotType: null,
    },
  });
  const [openCheckSpotsSheet, setOpenCheckSpotsSheet] = useState(false);
  const [openConfirmSheet, setOpenConfirmSheet] = useState(false);

  const onSubmit = (data: any) => {
    console.log('예약 정보', data);
  };

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectScheduleSection
          onClickReserve={() => setOpenCheckSpotsSheet(true)}
          parkingLotUuid={parkingLotUuid}
        />
        <CheckAvailableSpotsSheet
          open={openCheckSpotsSheet}
          onOpenChange={setOpenCheckSpotsSheet}
          parkingLotUuid={parkingLotUuid || ''}
          onOpenConfirm={() => setOpenConfirmSheet(true)}
        />
        <ReservationConfirmSheet
          parkingLotData={parkingLotData}
          open={openConfirmSheet}
          onOpenChange={setOpenConfirmSheet}
          onSubmit={handleSubmit(onSubmit)}
        />
      </form>
    </FormProvider>
  );
}
