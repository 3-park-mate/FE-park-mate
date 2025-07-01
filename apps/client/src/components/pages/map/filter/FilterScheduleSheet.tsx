'use client';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui/components/base/sheet';
import FilterScheduleContent from './FilterScheduleContent';
import { FilterScheduleBadge } from './FilterScheduleBadge';
import { useState } from 'react';

export default function FilterScheduleSheet() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <FilterScheduleBadge />
      </SheetTrigger>
      <SheetTitle />
      <SheetContent
        side="bottom"
        className="max-w-[600px] mx-auto scrollbar-hide rounded-t-2xl h-11/12 overflow-y-scroll"
      >
        <FilterScheduleContent setOpen={setOpen} />{' '}
      </SheetContent>
    </Sheet>
  );
}
