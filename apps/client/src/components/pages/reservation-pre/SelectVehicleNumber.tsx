import { CreateReservationRequestType } from '@/types/reservationDataTypes';
import { UserVehicleDataType } from '@/types/userDataTypes';
import { Input } from '@repo/ui/components/base/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/base/select';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function SelectVehicleNumber({
  vehicles,
}: {
  vehicles?: UserVehicleDataType[];
}) {
  const [isDirectInput, setIsDirectInput] = useState(false);
  const { setValue, register } = useFormContext<CreateReservationRequestType>();

  return (
    <div className="my-8 px-2 space-y-3">
      <p className="font-semibold text-lg">챠량 번호 입력</p>
      {vehicles && vehicles?.length > 0 ? (
        <>
          {' '}
          <Select
            onValueChange={(value) => {
              if (value === '직접입력') {
                setIsDirectInput(true);
                setValue('vehicleNumber', '');
              } else {
                setIsDirectInput(false);
                setValue('vehicleNumber', value);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="차량을 선택하세요" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {vehicles.map((vehicle, idx) => (
                <SelectItem
                  key={idx}
                  value={vehicle.vehicleNumber}
                  className=" hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center gap-1">
                    {vehicle.defaultSelected && (
                      <div className="h-[18px] text-primary-dark-50 border border-primary-dark-50 text-xs px-1 rounded-lg flex items-center">
                        기본
                      </div>
                    )}
                    <p className="text-sm text-gray-500">{vehicle.nickname}</p>
                    <p className="text-md font-medium">
                      {vehicle.vehicleNumber}
                    </p>
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="직접입력">직접입력 </SelectItem>
            </SelectContent>
          </Select>
          {isDirectInput && (
            <Input
              placeholder="예: 12가 3456"
              className="mt-2"
              {...register('vehicleNumber', { required: true })}
            />
          )}
        </>
      ) : (
        <Input
          placeholder="예: 12가 3456"
          className="mt-2"
          {...register('vehicleNumber', { required: true })}
        />
      )}
    </div>
  );
}
