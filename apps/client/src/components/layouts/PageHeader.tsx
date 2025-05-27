import { cn } from '@repo/ui/lib/utils';
import BackButton from './BackButton';
export default function PageHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'h-13 flex items-center justify-center relative',
        className
      )}
    >
      <div className="absolute left-0 flex justify-center">
        <BackButton className="ml-3" />
      </div>
      <h1 className="font-semibold">{title}</h1>
    </header>
  );
}
