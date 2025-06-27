import { Input } from '../base/input';
import { cn } from '../../lib/utils';

export default function CommonInputWithLabel({
  className,
  label,
  id,
  type = 'text',
  errorMessage,
  description,
  ...props
}: {
  label?: string;
  className?: string;
  errorMessage?: string;
  description?: string;
} & React.ComponentProps<'input'>) {
  return (
    <div className={cn('grid w-full items-center gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className={`font-semibold text-13px text-gray-3 ms-1 ${
            errorMessage ? 'text-red-500' : ''
          }`}
        >
          {label}
        </label>
      )}

      <Input
        type={type}
        id={id}
        {...props}
        className={cn(
          'bg-white',
          errorMessage ? 'border-red-300 focus-visible:border-red-400' : '',
          props.readOnly && 'bg-gray-light-1 text-gray-3'
        )}
      />
      {description && (
        <p className="text-13px text-gray-3 ms-1 break-keep">· {description}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 text-13px ms-1">{errorMessage}</p>
      )}
    </div>
  );
}
