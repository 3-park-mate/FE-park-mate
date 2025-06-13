import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../../lib/utils';
import { Checkbox } from '../base/checkbox';

export function CommonCheckbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <Checkbox
      className={cn(
        'w-4 h-4 rounded cursor-pointer border transition-all duration-200 text-white pointer-events-none',
        'data-[state=checked]:bg-secondary data-[state=checked]:border-secondary',
        'data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-300',
        className
      )}
      {...props}
    />
  );
}
