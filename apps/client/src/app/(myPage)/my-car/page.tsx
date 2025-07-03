import { getUserVehiclesData } from '@/actions/user/user-service';
import PageHeader from '@/components/layouts/PageHeader';
import MyCarListSection from '@/components/pages/myPage/myCar/MyCarListSection';

export default async function page() {
  const { data: VehiclesData } = (await getUserVehiclesData()) as {
    success: true;
    data: { vehicleUuid: string }[];
  };

  return (
    <>
      <PageHeader title="내 차량" />
      <main>
        <MyCarListSection VehiclesData={VehiclesData} />
      </main>
    </>
  );
}
