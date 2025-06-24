'use client';

import { EvChargeButton } from './FilterEvChargeButton';
import { ScheduleButton } from './FilterScheduleButton';

export default function FilterButtonSection() {
  return (
    <section className="fixed px-5 top-17 z-50 flex gap-5 w-full max-w-[500px]">
      <ScheduleButton />
      <EvChargeButton />
    </section>
  );
}
