import { getWeeklyOperationById } from '@/actions/parking/parking-service';

export default async function OperationCalendar({
  parkingLotUuid,
}: {
  parkingLotUuid: string;
}) {
  const today = new Date().getDate();

  const operationResult = await getWeeklyOperationById(parkingLotUuid);
  const weekData = operationResult.success ? operationResult.data : [];

  const getDayColor = (day: string) => {
    if (day === '일') return 'text-red-400';
    if (day === '토') return 'text-blue-400';
    return 'text-gray-2';
  };

  return (
    <div className="bg-white border rounded-2xl mx-auto overflow-hidden">
      <div className="grid grid-cols-7">
        {weekData.map((item, index) => (
          <div key={index}>
            <p
              className={`text-sm font-medium mb-1 ps-3 pe-4 py-2 bg-inner-background-gray ${getDayColor(item.dayOfWeek)}`}
            >
              {item.dayOfWeek}
            </p>
            <div className="relative flex flex-col p-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-medium ${
                  item.dayOfMonth === today
                    ? 'text-white bg-primary'
                    : 'text-black bg-transparent'
                }`}
              >
                {item.dayOfMonth}
              </div>
              {item.dayOfMonth === today && (
                <div className="mt-2 text-11px sm:text-xs text-gray-2 space-y-1 ps-1 pb-2 min-h-[1.5rem]">
                  {item.startTime && item.endTime ? (
                    <p>
                      {item.startTime} - {item.endTime}
                    </p>
                  ) : (
                    <p className="text-gray-300">-</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
