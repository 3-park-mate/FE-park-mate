'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@repo/ui/components/base/sheet';
import { ScheduleButton } from './FilterScheduleButton';
import { useEffect, useState } from 'react';
import { SelectSchedule } from './SelectSchedule';
export default function SelectScheduleSheet() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <ScheduleButton />
      </SheetTrigger>
      <SheetContent side="bottom">
        <SelectSchedule onClose={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
