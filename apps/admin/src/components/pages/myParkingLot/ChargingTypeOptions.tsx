import { chargingTypes } from '@/data/initialDatas';
import { EVChargeTypeString } from '@/types/addParkingLotDataTypes';
import { Checkbox } from '@repo/ui/components/base/checkbox';
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
              <label
                htmlFor={`parkingSpot.chargeable.${index}.evChargeTypes.${key}`}
                className={cn(
                  'flex items-center justify-between cursor-pointer select-none border px-3 py-2 rounded-2xl transition-colors duration-200',
                  checked
                    ? 'bg-secondary/10 border-secondary'
                    : 'bg-white border-gray-200 dark:bg-gray-800'
                )}
              >
                <div className="flex gap-1 items-center">
                  <Icon size={16} className="text-gray-2" />
                  <p className="text-sm me-1">{label}</p>
                </div>
                <Checkbox
                  id={`parkingSpot.chargeable.${index}.evChargeTypes.${key}`}
                  className={cn(
                    'w-5 h-5 rounded cursor-pointer border transition-all duration-200 text-white',
                    'data-[state=checked]:bg-secondary data-[state=checked]:border-secondary',
                    'data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-300'
                  )}
                  checked={checked}
                  onCheckedChange={handleChange}
                />
              </label>
            );
          }}
        />
      ))}
    </div>
  );
}
