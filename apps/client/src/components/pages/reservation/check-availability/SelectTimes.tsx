'use client';

import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { formatDateParts } from '@/utils/datetimeUtils';

interface Props {
  from: Date;
  to: Date;
  onChange: (type: 'entry' | 'exit', value: string) => void;
}

export default function SelectTimes({ from, to, onChange }: Props) {
  return (
    <div className="flex gap-5">
      <CommonInputWithLabel
        id="entryTime"
        label={`입차시간 ${formatDateParts(from.toString()).date}`}
        type="time"
        onChange={(e) => onChange('entry', e.target.value)}
      />
      <CommonInputWithLabel
        id="exitTime"
        label={`출차시간 ${formatDateParts(to.toString()).date}`}
        type="time"
        onChange={(e) => onChange('exit', e.target.value)}
      />
    </div>
  );
}
