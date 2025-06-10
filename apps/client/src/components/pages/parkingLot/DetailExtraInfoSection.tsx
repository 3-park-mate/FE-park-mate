import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import MapLinkButton from './MapLinkButton';

export default function DetailExtraInfoSection({
  mainAddress,
  extraInfo,
}: {
  mainAddress: string;
  extraInfo: string;
}) {
  return (
    <PaddedSection className="py-7 space-y-10 bg-white" id="info">
      <div>
        <h2 className="text-lg font-semibold mb-2">정보</h2>
        <p className="text-sm text-gray-2">{extraInfo}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">영업시간</h2>
        <p className="text-sm text-gray-2">월요일 : 09:00 - 24:00</p>
        <p className="text-sm text-gray-2">화요일(오늘) : 09:00 - 24:00</p>
      </div>
      <MapLinkButton mainAddress={mainAddress} />
    </PaddedSection>
  );
}
