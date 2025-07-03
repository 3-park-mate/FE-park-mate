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
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toLocalISOString } from '@/utils/datetimeUtils';
import { ScheduleType } from '@/types/initialDataTypes';
import { scheduleSchema } from '@/schemas/scheduleSchema';

export default function FilterScheduleSheet() {
  const methods = useForm<ScheduleType>({
    resolver: zodResolver(scheduleSchema),
  });

  const { handleSubmit } = methods;
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const onSubmit = (data: ScheduleType) => {
    const { entryDateTime, exitDateTime } = data;

    const params = new URLSearchParams(searchParams.toString());
    params.set('entry', toLocalISOString(entryDateTime!));
    params.set('exit', toLocalISOString(exitDateTime!));

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FilterScheduleContent />
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
