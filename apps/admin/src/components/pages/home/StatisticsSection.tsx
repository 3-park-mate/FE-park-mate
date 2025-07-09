import {
  getDateSalesRange,
  getWeeklyTotalSales,
} from '@/actions/host/host-service';
import StatisticsChart from '@/components/pages/home/StatisticsChart';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/base/carousel';

export default async function StatisticsSection() {
  const res = await getDateSalesRange({
    startDate: '2024-06-01',
    endDate: '2024-06-07',
  });

  const totalSaleRes = await getWeeklyTotalSales();

  if (
    !res.success ||
    !totalSaleRes.success ||
    !res.data ||
    res.data.length === 0
  ) {
    return (
      <PaddedSection className="py-3">
        <div className="bg-white rounded-2xl border overflow-hidden p-4 text-center text-sm text-gray-500">
          데이터를 불러오지 못했습니다.
        </div>
      </PaddedSection>
    );
  }

  const parkingLotStatics = res.data;

  const totalWeeklySales = totalSaleRes.data.totalWeeklySales;

  return (
    <PaddedSection className="py-3">
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-lg">주간 매출 통계</h1>
            <p className="text-xs text-gray-3">
              클릭하여 일별 매출을 확인하세요.
            </p>
          </div>
          <p className="font-bold text-2xl text-secondary">
            {totalWeeklySales.toLocaleString('ko-KR')}
            <span className="text-gray-2 text-sm font-normal ps-0.5">원</span>
          </p>
        </div>
        <hr />
        <Carousel className="w-full">
          <CarouselContent className="px-4">
            {parkingLotStatics.map((parkingLot, index) => (
              <CarouselItem key={parkingLot.parkingLotUuid || index}>
                <StatisticsChart staticData={parkingLot} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </PaddedSection>
  );
}
