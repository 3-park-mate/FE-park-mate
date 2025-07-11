import {
  getUserVehicleDetailData,
  getUserVehiclesData,
} from '@/actions/user/user-service';
import { UserVehicleDataType } from '@/types/userDataTypes';
import { useEffect, useState } from 'react';

export function useGetUserVehicles() {
  const [vehicles, setVehicles] = useState<UserVehicleDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await getUserVehiclesData();
        if (!res.success || !res.data) {
          setVehicles([]);
          return;
        }

        const detailResults = await Promise.all(
          res.data.map(async (item) => {
            const detailRes = await getUserVehicleDetailData(item.vehicleUuid);
            return detailRes.success && detailRes.data ? detailRes.data : null;
          })
        );

        const filtered = detailResults.filter(
          (v): v is UserVehicleDataType => v !== null
        );
        setVehicles(filtered);
      } catch (err) {
        console.error('차량 목록 또는 상세 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, []);

  return { vehicles, loading };
}
