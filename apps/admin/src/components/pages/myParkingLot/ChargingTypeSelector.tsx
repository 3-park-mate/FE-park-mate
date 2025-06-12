import ChargingTypeOptions from './ChargingTypeOptions';

export default function ChargingTypeSelector({
  index,
  onRemove,
}: {
  index: number;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 border rounded-xl p-4 relative">
      {index > 0 && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-4 right-4 text-secondary text-sm cursor-pointer"
          aria-label={`주차면 ${index + 1} 삭제`}
        >
          삭제
        </button>
      )}
      <p className="w-full text-center text-sm text-gray-2 mb-3">
        주차면 {index + 1}
      </p>
      <ChargingTypeOptions index={index} />
    </div>
  );
}
