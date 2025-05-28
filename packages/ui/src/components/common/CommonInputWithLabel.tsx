import { Input } from '../base/input';
import { cn } from '../../lib/utils';

export default function CommonInputWithLabel({
  className,
  label,
  id,
  type = 'text',
  errorMessage,
  ...props
}: {
  label: string;
  className?: string;
  errorMessage?: string;
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
      {errorMessage && (
        <p className="text-red-500 text-[13px] ms-1">{errorMessage}</p>
      )}
    </div>
  );
}
