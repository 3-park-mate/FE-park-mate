import { cn } from '@repo/ui/lib/utils';
import React from 'react';

export default function MenuIconListItem({
  Icon,
  children,
  className,
  iconClassName,
  ...buttonProps
}: {
  Icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <li className="flex-1">
      <button
        className={cn(
          'flex flex-col items-center gap-1 cursor-pointer w-full',
          className
        )}
        {...buttonProps}
      >
        <Icon
          fill="currentColor"
          className={cn('text-gray-1', iconClassName)}
        />
        <span className="text-gray-2 text-sm text-center break-keep">
          {children}
        </span>
      </button>
    </li>
  );
}
