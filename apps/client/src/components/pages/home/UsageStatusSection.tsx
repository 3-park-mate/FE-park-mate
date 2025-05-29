import { MapPin } from 'lucide-react';

export default function UsageStatusSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[15px]">코엑스 제2빌딩 주차장 A</p>
          <p className="flex items-center gap-1 text-gray-3 text-[13px]">
            <MapPin size={16} /> 0.31 mi away
          </p>
        </div>
        <div className="bg-white w-12 aspect-square rounded-lg drop-shadow-lg"></div>
      </div>
      <hr />
      <div className="text-[15px] flex justify-between">
        <p>05.30 (금) 10:00</p>
        <p>05.30 (금) 13:00</p>
      </div>
      <hr />
      <div>
        <p className="text-xs text-gray-dark-2">1시간 23분 남음</p>
      </div>
    </div>
  );
}
