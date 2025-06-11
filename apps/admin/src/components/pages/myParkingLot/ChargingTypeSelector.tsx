import { chargingTypes } from '@/data/initialDatas';
import {
  AddParkingLotStoreDataType,
  EVChargeTypeString,
} from '@/types/addParkingLotDataTypes';
import { Checkbox } from '@repo/ui/components/base/checkbox';
import { useFormContext, Controller } from 'react-hook-form';

export default function ChargingTypeSelector({ index }: { index: number }) {
  const { control } = useFormContext<AddParkingLotStoreDataType>();

  return (
    <div className="flex flex-wrap justify-center gap-2 border rounded-xl p-4">
      <p className="w-full text-center text-sm text-gray-2 mb-3">
        주차면 {index + 1}
      </p>
      <div className="grid grid-cols-2 gap-2 w-full max-w-[400px]">
        {chargingTypes.map(({ key, icon: Icon, label }) => (
          <Controller
            key={key}
            control={control}
            name={`parkingSpot.chargeable.${index}.evChargeTypes`}
            render={({ field: { value = [], onChange } }) => {
              const checked = value.includes(key as EVChargeTypeString);

              const handleChange = (checked: boolean) => {
                if (checked) {
                  onChange([...value, key as EVChargeTypeString]);
                } else {
                  onChange(value.filter((v: EVChargeTypeString) => v !== key));
                }
              };

              return (
                <label
                  htmlFor={`parkingSpot.chargeable.${index}.evChargeTypes.${key}`}
                  className="flex items-center justify-between cursor-pointer select-none border px-3 py-2 rounded-2xl"
                >
                  <div className="flex gap-1 items-center">
                    <Icon size={16} className="text-gray-2" />
                    <p className="text-sm me-1">{label}</p>
                  </div>
                  <Checkbox
                    id={`parkingSpot.chargeable.${index}.evChargeTypes.${key}`}
                    className="w-5 h-5 cursor-pointer data-[state=checked]:bg-secondary dark:data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                    checked={checked}
                    onCheckedChange={handleChange}
                  />
                </label>
              );
            }}
          />
        ))}
      </div>
    </div>
  );
}
