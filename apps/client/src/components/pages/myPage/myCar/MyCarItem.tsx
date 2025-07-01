import { getUserVehicleDetailData } from '@/actions/user/user-service';
import { UserVehicleDataType } from '@/types/userDataTypes';
import { Car } from 'lucide-react';
import DeleteCarButton from './DeleteCarButton';
import SetDefaultCarButton from './SetDefaultCarButton';

export default async function MyCarItem({
  vehicleUuid,
  showDeleteButton = true,
}: {
  vehicleUuid: string;
  showDeleteButton?: boolean;
}) {
  const { data: vehicleData } = (await getUserVehicleDetailData(
    vehicleUuid
  )) as {
    success: true;
    data: UserVehicleDataType;
  };

  return (
    <div className="outline outline-gray-1 rounded-lg px-4 py-3">
      <div className="flex gap-1 items-center">
        <p className="text-15px">{vehicleData.nickname}</p>
        {vehicleData.defaultSelected && (
          <div className="h-[20px] text-primary-dark-50 border border-primary-dark-50 text-xs px-1 rounded-lg flex items-center">
            기본
          </div>
        )}
      </div>
      <div className="flex gap-1 items-center">
        <Car fill="currentColor" className="text-gray-light-2" size={18} />
        <p className="text-gray-dark-2 text-sm">{vehicleData.vehicleNumber}</p>
      </div>
      <div className="space-x-1.5 flex items-center pt-2 text-sm">
        {showDeleteButton && <DeleteCarButton vehicleUuid={vehicleUuid} />}
        {!vehicleData.defaultSelected && (
          <>
            <p className="text-gray-dark-1">|</p>{' '}
            <SetDefaultCarButton vehicleUuid={vehicleUuid} />
          </>
        )}
      </div>
    </div>
  );
}
