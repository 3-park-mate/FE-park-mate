import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../../lib/utils';
import { Checkbox } from '../base/checkbox';

type CommonCheckboxProps = React.ComponentProps<
  typeof CheckboxPrimitive.Root
> & {
  theme?: 'primary' | 'secondary';
};

export function CommonCheckbox({
  className,
  theme = 'secondary',
  ...props
}: CommonCheckboxProps) {
  const themeClasses = {
    primary:
      'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
    secondary:
      'data-[state=checked]:bg-secondary data-[state=checked]:border-secondary',
  };

  return (
    <Checkbox
      className={cn(
        'w-4 h-4 rounded cursor-pointer border transition-all duration-200 text-white',
        themeClasses[theme],
        'data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-300',
        className
      )}
      {...props}
    />
  );
}
