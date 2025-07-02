'use client';

import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { formatDateParts } from '@/utils/datetimeUtils';
import { cn } from '@repo/ui/lib/utils';
import { useFormContext } from 'react-hook-form';
import { ScheduleType } from '@/types/initialDataTypes';

interface Props {
  from: Date;
  to: Date;
  onChange: (type: 'entry' | 'exit', value: string) => void;
  className?: string;
}

export default function SelectTimes({ from, to, onChange, className }: Props) {
  const {
    getValues,
    formState: { errors },
  } = useFormContext<ScheduleType>();

  const { entryDateTime, exitDateTime } = getValues();
  const showErrorMessage = !!entryDateTime && !!exitDateTime && !!errors;

  return (
    <div className={cn('flex items-center gap-5', className)}>
      <CommonInputWithLabel
        id="entryTime"
        label={`입차시간 ${formatDateParts(from.toString()).date}`}
        type="time"
        onChange={(e) => onChange('entry', e.target.value)}
        reserveErrorMessageSpace
      />
      <CommonInputWithLabel
        id="exitTime"
        label={`출차시간 ${formatDateParts(to.toString()).date}`}
        type="time"
        onChange={(e) => onChange('exit', e.target.value)}
        reserveErrorMessageSpace
        errorMessage={
          showErrorMessage ? errors.exitDateTime?.message : undefined
        }
      />
    </div>
  );
}
