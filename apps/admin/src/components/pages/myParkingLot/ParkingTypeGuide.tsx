export default function ParkingTypeGuide() {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-semibold text-secondary">
        차량 종류별 주차면 기준 안내
      </h3>
      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mt-1">
        <li>경차: 약 2.3m × 4.8m (7.2 ㎡)</li>
        <li>소형차: 약 2.3m × 5.0m (11.3 ㎡)</li>
        <li>중형차: 약 2.5m × 5.1m (12.5 ㎡)</li>
        <li>대형차: 약 2.7m × 5.4m (14.9 ㎡ 이상)</li>
      </ul>
      <p className="text-13px text-gray-3 text-right mt-3">
        「국토교통부 주차장 설치기준」 및 「도로교통공단」안내 기준
      </p>
    </div>
  );
}
