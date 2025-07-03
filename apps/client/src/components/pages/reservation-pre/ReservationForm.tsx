'use client';

import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { FormProvider, useForm } from 'react-hook-form';
import SelectScheduleSection from './check-availability/SelectScheduleSection';
import CheckAvailableSpotsSheet from './check-availability/CheckAvailableSpotsSheet';
import { useState } from 'react';
import ReservationConfirmSheet from './ReservationConfirmSheet';
import { ParkingLotResponseDataType } from '@/types/parkingDataTypes';
import { reserviationPreCreate } from '@/actions/reservation/reservation-service';

export default function ReservationForm({
  parkingLotUuid,
  parkingLotData,
}: {
  parkingLotUuid?: string;
  parkingLotData: ParkingLotResponseDataType;
}) {
  const methods = useForm<CreateReservationRequestType>({
    mode: 'onSubmit',
    defaultValues: {
      parkingLotUuid: parkingLotUuid,
    },
  });
  const [openCheckSpotsSheet, setOpenCheckSpotsSheet] = useState(false);
  const [openConfirmSheet, setOpenConfirmSheet] = useState(false);

  const onSubmit = async (data: CreateReservationRequestType) => {
    try {
      const res = await reserviationPreCreate(data);
      if (!res.success) {
        alert('예약에 실패했습니다. 다시 시도해주세요.');
        return;
      }
      console.log('저장되었습니다.');
    } catch (error) {
      console.error('예약 중 오류 발생:', error);
      alert('시스템 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  const { handleSubmit } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectScheduleSection
            onClickReserve={() => {
              setOpenCheckSpotsSheet(true);
            }}
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
    </>
  );
}