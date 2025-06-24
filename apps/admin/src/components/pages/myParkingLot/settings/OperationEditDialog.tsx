'use client';
import {
  OperationDataType,
  OperationStoreDataType,
} from '@/types/parkingDataTypes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/base/dialog';
import { Button } from '@repo/ui/components/base/button';
import { useForm } from 'react-hook-form';
import { handleKeyDown } from '@/utils/formUtils';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { formatDate, formatDateParts } from '@/utils/datetimeUtils';
import CommonSelect from '@repo/ui/components/common/CommonSelect';
import { useEffect } from 'react';

export default function OperationEditDialog({
  operation,
  onSubmit,
}: {
  operation?: OperationDataType;
  onSubmit: (data: OperationDataType) => void;
}) {
  const { register, handleSubmit, setValue, getValues, reset } =
    useForm<OperationStoreDataType>({
      defaultValues: {
        validStartTime: operation?.validStartTime
          ? formatDateParts(operation.validStartTime).time
          : '',
        validEndTime: operation?.validEndTime
          ? formatDateParts(operation.validEndTime).time
          : '',
        baseIntervalMinutes: String(operation?.baseIntervalMinutes ?? 30),
        baseFee: operation?.baseFee ?? 0,
        extraIntervalMinutes: String(operation?.extraIntervalMinutes ?? 10),
        extraFee: operation?.extraFee ?? 0,
        discountRate: operation?.discountRate ?? 0,
      },
    });

  useEffect(() => {
    reset({
      validStartTime: operation?.validStartTime
        ? formatDateParts(operation.validStartTime).time
        : '',
      validEndTime: operation?.validEndTime
        ? formatDateParts(operation.validEndTime).time
        : '',
      baseIntervalMinutes: String(operation?.baseIntervalMinutes ?? 30),
      baseFee: operation?.baseFee ?? 0,
      extraIntervalMinutes: String(operation?.extraIntervalMinutes ?? 10),
      extraFee: operation?.extraFee ?? 0,
      discountRate: operation?.discountRate ?? 0,
    });
  }, [operation, reset]);

  // 폼 제출 시 직접 onSubmit prop으로 데이터 전달

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full h-10 mt-4">
          {operation ? '운영 정보 수정하기' : '운영 정보 등록하기'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>운영 정보 {operation ? '수정' : '등록'}</DialogTitle>
          {operation?.operationDate && (
            <p className="text-15px text-gray-2">
              {formatDate(operation.operationDate)}
            </p>
          )}
        </DialogHeader>
        <form
          // onSubmit={handleSubmit(onSubmitHandler)}
          className="space-y-4 mt-4"
          onKeyDown={handleKeyDown}
        >
          <div className="flex gap-3">
            <CommonInputWithLabel
              label="시작 시간"
              type="time"
              placeholder="예: 08:00"
              {...register('validStartTime')}
            />
            <CommonInputWithLabel
              label="종료 시간"
              type="time"
              placeholder="예: 22:00"
              {...register('validEndTime')}
            />
          </div>
          <hr />
          <div className="flex gap-3">
            <CommonSelect
              label="기본 단위 시간 (분)"
              value={getValues('baseIntervalMinutes')}
              onChange={(value) =>
                setValue('baseIntervalMinutes', value, { shouldValidate: true })
              }
              options={[
                { label: '30분', value: '30' },
                { label: '60분', value: '60' },
              ]}
              className="w-full"
            />
            <CommonInputWithLabel
              label="단위 시간당 요금 (원)"
              type="number"
              placeholder="단위 시간당 요금 (원)"
              min={0}
              maxLength={6}
              {...register('baseFee', { valueAsNumber: true })}
            />
          </div>
          <div className="flex gap-3">
            <CommonSelect
              label="추가 요금 단위 시간 (분)"
              value={getValues('extraIntervalMinutes')}
              onChange={(value) =>
                setValue('extraIntervalMinutes', value, {
                  shouldValidate: true,
                })
              }
              options={Array.from({ length: 6 }, (_, i) => {
                const val = (i + 1) * 5;
                return { label: `${val}분`, value: String(val) };
              })}
              className="w-full"
            />
            <CommonInputWithLabel
              label="추가 시간당 요금 (원)"
              type="number"
              placeholder="추가 시간당 요금 (원)"
              min={0}
              {...register('extraFee', { valueAsNumber: true })}
            />
          </div>
          <hr />
          <CommonInputWithLabel
            label="할인율 (%)"
            type="number"
            placeholder="할인율 (%)"
            min={0}
            max={100}
            {...register('discountRate', { valueAsNumber: true })}
          />
          <DialogFooter className="mt-7">
            <Button type="submit" variant="secondary">
              저장
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
