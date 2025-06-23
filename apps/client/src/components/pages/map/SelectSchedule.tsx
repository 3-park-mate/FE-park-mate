'use client';

import { Calendar } from '@repo/ui/components/base/calendar';
import { CalendarIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function SelectSchedule() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const entry = searchParams.get('entry');
  const exit = searchParams.get('exit');

  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [confirm, setConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleConfirm = () => {
    if (range?.from && range.to) {
      console.log('일정 선택 완료');
      setConfirm(true);
      setEdit(false);
      router.push('map');
    }
  };
  return openModal ? (
    <section className="h-full">
      <div className="z-[100]">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          className="rounded-md w-full h-screen  bg-white z-[100]"
        />
        <button onClick={handleConfirm}>확인</button>
      </div>
    </section>
  ) : (
    <button
      className="absolute top-16 mx-3 bg-white/70 px-3 py-1.5 rounded-full flex items-center gap-1 text-sm text-gray-2 z-50"
      onClick={() => setOpenModal(true)}
    >
      <CalendarIcon className="size-5" />
      <p>일정선택</p>
    </button>
  );
}
