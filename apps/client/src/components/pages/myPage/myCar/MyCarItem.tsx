import { VehicleDataType } from '@/types/myPageDataTypes';
import { Car } from 'lucide-react';

export default function MyCarItem({
  vehicleNumber,
  isDefault,
  nickname,
  showDeleteButton = true,
}: VehicleDataType & { showDeleteButton?: boolean }) {
  return (
    <div className="outline outline-gray-1 rounded-lg px-4 py-3">
      <div className="flex gap-1 items-center">
        <p className="text-15px">{nickname}</p>
        {isDefault && (
          <div className="h-[20px] text-primary-dark-50 border border-primary-dark-50 text-xs px-1 rounded-lg flex items-center">
            기본
          </div>
        )}
      </div>
      <div className="flex gap-1 items-center">
        <Car fill="currentColor" className="text-gray-light-2" size={18} />
        <p className="text-gray-dark-2 text-sm">{vehicleNumber}</p>
      </div>
      {showDeleteButton && (
        <button className="pt-2 text-sm text-gray-2 cursor-pointer hover:text-gray-700">
          삭제
        </button>
      )}
    </div>
  );
}
