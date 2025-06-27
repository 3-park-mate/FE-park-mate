'use client';
import { OperationStoreDataType } from '@/types/parkingDataTypes';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import CommonSelect from '@repo/ui/components/common/CommonSelect';

export default function OperationEditFields() {
  const { register, setValue, control } =
    useFormContext<OperationStoreDataType>();

  const { errors } = useFormState<OperationStoreDataType>();
  console.log('erros: ', errors);

  const selectedBaseIntervalMinutes =
    useWatch({
      control,
      name: 'baseIntervalMinutes',
    }) ?? 15;

  const selectedExtraIntervalMinutes =
    useWatch({
      control,
      name: 'extraIntervalMinutes',
    }) ?? 15;

  const createNumberInputHandlers = (
    fieldName: keyof OperationStoreDataType
  ) => {
    const {
      ref,
      onBlur: rhfOnBlur,
      ...rest
    } = register(fieldName, { valueAsNumber: true });

    return {
      ...rest,
      ref,
      type: 'text',
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '0') {
          e.target.value = '';
        }
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value === '') {
          setValue(fieldName, 0 as any);
        } else {
          const numericValue = value.replace(/[^0-9]/g, '');
          setValue(fieldName, Number(numericValue) as any);
        }
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
          setValue(fieldName, 0 as any);
        }
        if (rhfOnBlur) {
          rhfOnBlur(e);
        }
      },
    };
  };

  return (
    <>
      <div className="flex gap-3">
        <CommonInputWithLabel
          label="시작 시간"
          type="time"
          {...register('validStartTime')}
        />
        <CommonInputWithLabel
          label="종료 시간"
          type="time"
          placeholder="예: 22:00"
          {...register('validEndTime')}
        />
      </div>
      <div>
        <p className="text-red-500 text-13px ms-1">
          {errors.validStartTime?.message}
        </p>
        <p className="text-red-500 text-13px ms-1">
          {errors.validEndTime?.message}
        </p>
      </div>
      <hr />
      <div className="flex gap-3">
        <CommonSelect
          label="기본 단위 시간 (분)"
          value={String(selectedBaseIntervalMinutes)}
          onChange={(value) => setValue('baseIntervalMinutes', Number(value))}
          options={[
            { label: '30분', value: '30' },
            { label: '60분', value: '60' },
          ]}
          className="w-full"
        />
        <CommonInputWithLabel
          label="단위 시간당 요금 (원)"
          placeholder="단위 시간당 요금 (원)"
          min={100}
          maxLength={6}
          {...createNumberInputHandlers('baseFee')}
        />
      </div>
      <div>
        <p className="text-red-500 text-13px ms-1">
          {errors.baseIntervalMinutes?.message}
        </p>
        <p className="text-red-500 text-13px ms-1">{errors.baseFee?.message}</p>
      </div>
      <div className="flex gap-3">
        <CommonSelect
          label="추가 요금 단위 시간 (분)"
          value={String(selectedExtraIntervalMinutes)}
          onChange={(value) => setValue('extraIntervalMinutes', Number(value))}
          options={Array.from({ length: 6 }, (_, i) => {
            const val = (i + 1) * 5;
            return { label: `${val}분`, value: String(val) };
          })}
          className="w-full"
        />
        <CommonInputWithLabel
          label="추가 시간당 요금 (원)"
          placeholder="추가 시간당 요금 (원)"
          min={0}
          maxLength={6}
          {...createNumberInputHandlers('extraFee')}
        />
      </div>
      <div>
        <p className="text-red-500 text-13px ms-1">
          {errors.extraIntervalMinutes?.message}
        </p>
        <p className="text-red-500 text-13px ms-1">
          {errors.extraFee?.message}
        </p>
      </div>
      <hr />
      <CommonInputWithLabel
        label="할인율 (%)"
        placeholder="할인율 (%)"
        maxLength={3}
        {...createNumberInputHandlers('discountRate')}
      />
      <p className="text-red-500 text-13px ms-1">
        {errors.discountRate?.message}
      </p>
    </>
  );
}
