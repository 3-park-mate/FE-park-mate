import CurrentLocationIcon from '@repo/ui/components/icon/CurrentLocationIcon';

export default function CurrentLocationButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <>
      <button onClick={onClick} className="absolute top-38 right-5 z-40">
        <CurrentLocationIcon className="size-11 stroke-white bg-primary/90 p-2 rounded-full shadow-md hover:bg-gray-100" />
      </button>
    </>
  );
}
