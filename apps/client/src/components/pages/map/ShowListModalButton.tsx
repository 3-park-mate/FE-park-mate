import { useMapStore } from '@/store/useMapStore';
import { cn } from '@repo/ui/lib/utils';
import { AlignJustifyIcon } from 'lucide-react';

export default function ShowListModalButton({
  className,
}: {
  className?: string;
}) {
  const setIsOpenListModal = useMapStore((state) => state.setIsOpenListModal);
  return (
    <button
      className={cn(
        'fixed left-1/2 -translate-x-1/2 bottom-25 flex items-center shadow-md bg-white px-4 py-2 rounded-full gap-1 hover:bg-gray-100',
        className
      )}
      onClick={() => {
        setIsOpenListModal(true);
      }}
    >
      <AlignJustifyIcon className="size-4" />
      <p className="text-sm">목록보기</p>
    </button>
  );
}
