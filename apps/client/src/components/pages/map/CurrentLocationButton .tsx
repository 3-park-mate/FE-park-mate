import CurrentLocationIcon from '@repo/ui/components/icon/CurrentLocationIcon';
import { cn } from '@repo/ui/lib/utils';

export default function CurrentLocationButton({
  onClick,
  className,
}: {
  onClick: () => void;

  className?: string;
}) {
  return (
    <>
      <button
        onClick={onClick}
        className={cn('absolute bottom-25 right-5 z-50', className)}
      >
        <CurrentLocationIcon className="size-10 p-2 rounded-full stroke-primary bg-white shadow-md hover:bg-gray-light-1 cursor-pointer" />
      </button>
    </>
  );
}
