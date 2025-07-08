import { useMapStore } from '@/store/useMapStore';
import { centerMapToCurrentLocation } from '@/utils/mapUtils';
import CurrentLocationIcon from '@repo/ui/components/icon/CurrentLocationIcon';
import { cn } from '@repo/ui/lib/utils';

export default function CurrentLocationButton({
  map,
  className,
  fetchData,
}: {
  map: kakao.maps.Map | null;
  className?: string;
  fetchData: () => void;
}) {
  const setCenter = useMapStore((state) => state.setCenter);
  const setLevel = useMapStore((state) => state.setLevel);

  if (!map) return null;

  const handleClick = async () => {
    await centerMapToCurrentLocation({
      map,
      setCenter,
      fallback: false,
    });

    const center = map.getCenter();
    setCenter({ lat: center.getLat(), lng: center.getLng() });
    setLevel(map.getLevel());
    fetchData();
  };

  if (!map) return;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn('absolute bottom-25 right-5 z-50', className)}
      >
        <CurrentLocationIcon className="size-10 p-2 rounded-full stroke-primary bg-white shadow-md hover:bg-gray-light-1 cursor-pointer" />
      </button>
    </>
  );
}
