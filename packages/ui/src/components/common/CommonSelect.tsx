'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@repo/ui/components/base/select';

type SelectOption = string | { label?: string; value: string };

interface CommonSelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: boolean;
  errorMessage?: string;
  description?: string;
}

export default function CommonSelect({
  label,
  placeholder = '선택하세요',
  value,
  onChange,
  options,
  error = false,
  errorMessage,
  description,
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
          {options.map((option) => {
            if (typeof option === 'string') {
              return (
                <SelectItem key={option} value={option} className="text-15px">
                  {option}
                </SelectItem>
              );
            }
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-15px"
              >
                {option.label ?? option.value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {description && (
        <p className="text-sm text-gray-3 ms-1">· {description}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 text-12px ms-1">{errorMessage}</p>
      )}
    </div>
  );
}
