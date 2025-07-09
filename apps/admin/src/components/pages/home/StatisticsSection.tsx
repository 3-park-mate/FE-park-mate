import StatisticsChart from '@/components/pages/home/StatisticsChart';
import { DailySales } from '@/types/hostDataTypes';
import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';

export default function StatisticsSection({
  dailySalesList,
}: {
  dailySalesList: DailySales[];
}) {
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
          <p className="font-bold text-2xl text-secondary-50">
            200,000
            <span className="text-gray-2 text-sm font-normal ps-0.5">원</span>
          </p>
        </div>
        <hr />
        <StatisticsChart dailySalesList={dailySalesList} />
      </div>
    </PaddedSection>
  );
}
