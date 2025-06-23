export default function OperationEditGuide() {
  return (
    <div className="border rounded-xl p-5">
      <h3 className="font-semibold text-secondary">운영 정보 입력 가이드</h3>
      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mt-1 break-keep">
        <li className="font-semibold">
          해당 날짜의 운영 정보가 등록되어야 운영이 가능합니다.
        </li>
        <li>
          각 날짜의 기본 요금을 설정하고, 필요시 할인가 또는 추가 가격을
          설정하실 수 있습니다.
        </li>
        <li>
          정산과 관련한 설정은 &apos;마이호스트&apos; 페이지에서 진행해 주세요.
        </li>
      </ul>
    </div>
  );
}
