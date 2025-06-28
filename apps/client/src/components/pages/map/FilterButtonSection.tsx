'use client';

import { EvChargeButton } from './FilterEvChargeButton';
import SelectScheduleSheet from './SelectScheduleSheet';

export default function FilterButtonSection() {
  return (
    <section className="fixed px-5 top-17 z-50 flex gap-5 w-full max-w-[500px]">
      <SelectScheduleSheet />
      <EvChargeButton />
    </section>
  );
}
