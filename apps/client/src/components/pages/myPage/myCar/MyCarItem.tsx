import { getUserVehicleDetailData } from '@/actions/user/user-service';
import { UserVehicleDataType } from '@/types/userDataTypes';
import { Car } from 'lucide-react';
import DeleteCarButton from './DeleteCarButton';
import SetDefaultCarButton from './SetDefaultCarButton';

export default async function MyCarItem({
  vehicleUuid,
  fallbackVehicleData,
  showDeleteButton = true,
}: {
  vehicleUuid?: string;
  fallbackVehicleData?: Partial<
    Pick<UserVehicleDataType, 'nickname' | 'vehicleNumber' | 'defaultSelected'>
  >;
  showDeleteButton?: boolean;
}) {
  let vehicleData: Partial<
    Pick<UserVehicleDataType, 'nickname' | 'vehicleNumber' | 'defaultSelected'>
  >;

  if (vehicleUuid) {
    const { data } = (await getUserVehicleDetailData(vehicleUuid)) as {
      success: true;
      data: UserVehicleDataType;
    };
    vehicleData = data;
  } else if (fallbackVehicleData) {
    vehicleData = fallbackVehicleData;
  } else {
    return;
  }

  return (
    <div className="outline outline-gray-1 rounded-lg px-4 py-3">
      <div className="flex gap-1 items-center">
        {vehicleData.nickname && (
          <p className="text-15px">{vehicleData.nickname}</p>
        )}
        {vehicleData.defaultSelected && (
          <div className="h-[20px] text-primary-dark-50 border border-primary-dark-50 text-xs px-1 rounded-lg flex items-center">
            기본
          </div>
        )}
      </div>
      <div className="flex gap-1 items-center">
        <Car fill="currentColor" className="text-gray-light-2" size={18} />
        <p className="text-gray-dark-2 text-sm">
          {vehicleData.vehicleNumber ?? ''}
        </p>
      </div>
      {(showDeleteButton || (!vehicleData.defaultSelected && vehicleUuid)) && (
        <div className="space-x-1.5 flex items-center pt-2 text-sm">
          {showDeleteButton && vehicleUuid && (
            <DeleteCarButton vehicleUuid={vehicleUuid} />
          )}
          {!vehicleData.defaultSelected && vehicleUuid && (
            <>
              <p className="text-gray-dark-1">|</p>{' '}
              <SetDefaultCarButton vehicleUuid={vehicleUuid} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
