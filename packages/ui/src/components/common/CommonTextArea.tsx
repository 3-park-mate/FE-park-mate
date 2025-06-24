import { cn } from '../../lib/utils';
import { Textarea } from '../base/textarea';

export default function CommonTextArea({
  className,
  label,
  id,
  errorMessage,
  ...props
}: {
  label: string;
  className?: string;
  errorMessage?: string;
} & React.ComponentProps<'textarea'>) {
  return (
    <div className={cn('grid w-full items-center gap-1.5', className)}>
      <label
        htmlFor={id}
        className={`font-semibold text-13px text-gray-3 ms-1
        ${errorMessage ? 'text-red-500' : ''}`}
      >
        {label}
      </label>
      <Textarea
        id={id}
        {...props}
        className={cn(
          'resize-none min-h-[200px] bg-white',
          errorMessage && 'border-red-300 focus-visible:border-red-400',
          props.readOnly && 'bg-gray-light-1 text-gray-3'
        )}
      />
      {errorMessage && (
        <p className="text-red-500 text-13px ms-1">{errorMessage}</p>
      )}
    </div>
  );
}
