import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import CurrentLocationIcon from '@repo/ui/components/icon/CurrentLocationIcon';
import { cn } from '@repo/ui/lib/utils';

export default function CurrentLocationButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const navBarActive = useGnbNavBarStore((state) => state.active);

  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute bottom-35 right-5 z-50 bg-primary p-2.5 rounded-full shadow-md hover:bg-gray-100',
        !navBarActive && 'bottom-78'
      )}
    >
      <CurrentLocationIcon className="size-6.5 stroke-white" />
    </button>
  );
}
