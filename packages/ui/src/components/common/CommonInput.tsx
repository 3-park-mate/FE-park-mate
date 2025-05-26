import React from 'react';
import { Input } from '../base/input';
import { cn } from '../../lib/utils';

export default function CommonInput({
  className,
  label,
  id,
  type = 'text',
  ...props
}: {
  label: string;
  className?: string;
} & React.ComponentProps<'input'>) {
  return (
    <div className={cn('grid w-full items-center gap-1.5', className)}>
      <label
        htmlFor={id}
        className="font-semibold text-[13px] text-gray-3 ms-1"
      >
        {label}
      </label>
      <Input type={type} id={id} {...props} />
    </div>
  );
}
