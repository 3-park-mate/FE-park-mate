import { chargingTypes } from '@/data/initialDatas';
import { EVChargeTypeString } from '@/types/addParkingLotDataTypes';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import { CommonCheckbox } from '@repo/ui/components/common/CommonCheckbox';
import { OptionContainer } from '@repo/ui/components/common/CommonLayouts';
import { cn } from '@repo/ui/lib/utils';
import { Controller, useFormContext } from 'react-hook-form';

export default function ChargingTypeOptions({ index }: { index: number }) {
  const { control } = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-[400px]">
      {chargingTypes.map(({ key, icon: Icon, label }) => (
        <Controller
          key={key}
          control={control}
          name={`parkingSpot.chargeable.${index}.evChargeTypes`}
          render={({ field: { value = [], onChange } }) => {
            const checked = value.includes(key as EVChargeTypeString);

            const handleChange = (newChecked: boolean) => {
              if (newChecked) {
                onChange([...value, key as EVChargeTypeString]);
              } else {
                onChange(value.filter((v: EVChargeTypeString) => v !== key));
              }
            };

            return (
              <OptionContainer
                htmlFor={`parkingSpot.chargeable.${index}.evChargeTypes.${key}`}
                isSelected={checked}
              >
                <div className="flex gap-1 items-center">
                  <Icon size={16} className="text-gray-2" />
                  <p className="text-sm me-1">{label}</p>
                </div>
                <CommonCheckbox
                  id={`parkingSpot.chargeable.${index}.evChargeTypes.${key}`}
                  className="w-5 h-5"
                  checked={checked}
                  onCheckedChange={handleChange}
                />
              </OptionContainer>
            );
          }}
        />
      ))}
    </div>
  );
}
