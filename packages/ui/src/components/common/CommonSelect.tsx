'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@repo/ui/components/base/select';

interface CommonSelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: string[];
  error?: boolean; // 에러 여부
  errorMessage?: string; // 에러 메시지 (필요시)
}

export default function CommonSelect({
  label,
  placeholder = '선택하세요',
  value,
  onChange,
  options,
  error = false,
  errorMessage,
}: CommonSelectProps) {
  return (
    <div className="grid gap-2">
      {label && (
        <label
          className={`font-semibold text-13px ms-1 ${
            error ? 'text-red-500' : 'text-gray-3'
          }`}
        >
          {label}
        </label>
      )}
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className={`border-2 px-4 py-5 text-15px ${
            error ? 'border-red-500 focus-visible:ring-red-400' : ''
          }`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option} className="text-15px">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorMessage && (
        <p className="text-red-500 text-12px ms-1">{errorMessage}</p>
      )}
    </div>
  );
}
