import CurrentLocationIcon from '@repo/ui/components/icon/CurrentLocationIcon';

export default function CurrentLocationButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <>
      <button onClick={onClick} className="absolute top-38 right-5 z-40">
        <CurrentLocationIcon className="size-11 p-2 rounded-full stroke-white bg-primary/90 shadow-md hover:bg-primary-light cursor-pointer" />
      </button>
    </>
  );
}
