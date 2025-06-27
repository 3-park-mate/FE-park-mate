import CurrentLocationIcon from '@repo/ui/components/icon/CurrentLocationIcon';

export default function CurrentLocationButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <>
      <button onClick={onClick} className="absolute top-70 right-5 z-50">
        <CurrentLocationIcon className="size-10 p-2 rounded-full stroke-primary bg-white shadow-md hover:bg-gray-light-1 cursor-pointer" />
      </button>
    </>
  );
}
