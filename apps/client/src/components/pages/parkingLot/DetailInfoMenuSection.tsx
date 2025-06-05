import { parkingLotDetailMenus } from '@/data/initialDatas';
import AlwaysVisibleTooltip from '@repo/ui/components/common/AlwaysVisibleTooltip';
import {
  CommonButton,
  PaddedSection,
} from '@repo/ui/components/common/CommonLayouts';

export default function DetailInfoMenuSection({
  hostUuid,
  like,
  dislike,
  baseFee,
  availableSpots,
  registeredParkingCount,
}: {
  hostUuid: string;
  like: number;
  dislike: number;
  baseFee: number;
  availableSpots: number;
  registeredParkingCount: number;
}) {
  return (
    <PaddedSection className="py-5 space-y-5">
      <nav>
        <ul className="flex justify-between px-4">
          {parkingLotDetailMenus.map((item, index) => {
            let label = item.label;

            if (item.label === '좋아요') label = `좋아요 ${like}`;
            if (item.label === '싫어요') label = `싫어요 ${dislike}`;

            return (
              <li key={index}>
                <button className="flex flex-col items-center gap-1 cursor-pointer">
                  <item.Icon fill="currentColor" className="text-gray-1" />
                  <span className="text-gray-2 text-sm">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <AlwaysVisibleTooltip
        side="bottom"
        content={`1시간 ${baseFee.toLocaleString()}원`}
      >
        <CommonButton className="bg-primary-dark">
          예약하기 ({availableSpots}/{registeredParkingCount})
        </CommonButton>
      </AlwaysVisibleTooltip>
    </PaddedSection>
  );
}
