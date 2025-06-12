'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { TotalSpotCount } from '@repo/ui/components/common/CommonLayouts';
import ParkingTypeGuide from './ParkingTypeGuide';
import SpotInputItem from './SpotInputItem';
import { parkingSpotTypes } from '@/data/initialDatas';

export default function SpotCountSelectSection() {
  const { control, setValue } = useFormContext();

  const nonChargeable = useWatch({
    control,
    name: 'parkingSpot.nonChargeable',
  });

  const totalCount = Array.isArray(nonChargeable)
    ? nonChargeable.reduce((sum, spot) => sum + (spot?.count || 0), 0)
    : 0;

  const handleChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const normalized = val.length > 1 ? val.replace(/^0+/, '') : val;

    const newArr = [...(nonChargeable ?? [])];
    newArr[idx] = {
      ...newArr[idx],
      count: normalized === '' ? 0 : Number(normalized),
    };

    setValue('parkingSpot.nonChargeable', newArr, { shouldValidate: true });
  };

  return (
    <>
      <ParkingTypeGuide />
      <section className="space-y-4 py-4">
        {parkingSpotTypes.map(({ src, alt, label, parkingSpotType }, idx) => (
          <SpotInputItem
            key={parkingSpotType}
            src={src}
            alt={alt}
            label={label}
            name={`parkingSpot.nonChargeable.${idx}.count`}
            value={nonChargeable?.[idx]?.count ?? ''}
            onChange={(e) => handleChange(idx, e.target.value)}
          />
        ))}
      </section>
      <hr />
      <TotalSpotCount label="전체 주차면수" count={totalCount} />
    </>
  );
}
