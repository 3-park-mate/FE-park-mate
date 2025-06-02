import { cn } from '../../lib/utils';

import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../base/tooltip';

export default function AlwaysVisibleTooltip({
  children,
  content,
  className,
  side = 'top',
}: {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}) {
  return (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn(``, className)}
          style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
        >
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
