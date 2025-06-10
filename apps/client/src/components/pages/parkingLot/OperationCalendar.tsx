export default function OperationCalendar() {
  const today = 9;

  const weekData = [
    { day: '일', date: 8 },
    { day: '월', date: 9 },
    { day: '화', date: 10 },
    { day: '수', date: 11 },
    { day: '목', date: 12 },
    { day: '금', date: 13 },
    { day: '토', date: 14 },
  ];

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
              className={`text-sm font-medium mb-1 ps-3 pe-4 py-2 bg-inner-background-gray ${getDayColor(item.day)}`}
            >
              {item.day}
            </p>
            <div className="relative flex flex-col p-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-medium ${
                  item.date === today
                    ? 'text-white bg-primary-dark'
                    : 'text-black bg-transparent'
                }`}
              >
                {item.date}
              </div>
              {item.date === today && (
                <div className="mt-2 text-11px sm:text-xs text-gray-2 space-y-1 ps-1 pb-2">
                  <p>06:00 - 24:00</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
