import DotSpinner from '@repo/ui/components/icon/DotSpinner';

export default function AmountInfo({
  amount,
  isLoading,
  isScheduleSelected,
}: {
  amount?: number;
  isLoading: boolean;
  isScheduleSelected: boolean;
}) {
  return (
    <div>
      {isScheduleSelected ? (
        <>
          <p className="font-medium">총 결제금액</p>
          {isLoading ? (
            <DotSpinner className="mx-5" />
          ) : (
            <p className="text-2xl font-bold">
              {(amount ?? 0).toLocaleString()}
              <span className="text-xl font-semibold mx-0.5">원</span>
            </p>
          )}
        </>
      ) : (
        <p className="leading-tight">
          일정을 선택 후<br /> 총 결제 금액을 확인하세요
        </p>
      )}
    </div>
  );
}
