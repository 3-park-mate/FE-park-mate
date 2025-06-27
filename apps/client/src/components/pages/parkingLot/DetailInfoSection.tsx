import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import MapLinkButton from './MapLinkButton';
import OperationCalendar from './OperationCalendar';

export default function DetailInfoSection({
  mainAddress,
  parkingLotUuid,
  extraInfo,
  latitude,
  longitude,
}: {
  mainAddress: string;
  parkingLotUuid: string;
  extraInfo: string;
  latitude: number;
  longitude: number;
}) {
  return (
    <PaddedSection className="py-7 space-y-10 bg-white" id="info">
      <div>
        <h2 className="text-lg font-semibold mb-3">정보</h2>
        <p className="text-sm text-gray-2">{extraInfo}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-3">영업시간</h2>
        <OperationCalendar parkingLotUuid={parkingLotUuid} />
      </div>
      <MapLinkButton
        mainAddress={mainAddress}
        parkingLotUuid={parkingLotUuid}
        latitude={latitude}
        longitude={longitude}
      />
    </PaddedSection>
  );
}
