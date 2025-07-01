'use client';

import { FilterEvChargeBadge } from './FilterEvChargeBadge';
import FilterScheduleSheet from './FilterScheduleSheet';

export default function FilterMapSection() {
  return (
    <section className="fixed px-5 top-17 z-50 flex gap-2 w-full max-w-[500px]">
      <FilterScheduleSheet />
      <FilterEvChargeBadge />
    </section>
  );
}
