import {
  CommonButton,
  PaddedLayout,
} from '@repo/ui/components/common/CommonLayouts';
import { MessageCircle, Star, ThumbsDown, ThumbsUp } from 'lucide-react';

const iconData = [
  { Icon: MessageCircle, label: '채팅' },
  { Icon: Star, label: '즐겨찾기' },
  { Icon: ThumbsUp, label: '좋아요' },
  { Icon: ThumbsDown, label: '싫어요' },
];

export default function ReservationSection() {
  return (
    <PaddedLayout className="py-5 space-y-5">
      <div className="flex justify-between px-4">
        {iconData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <item.Icon fill="currentColor" className="text-gray-1" />
            <p className="text-gray-2 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
      <CommonButton className="bg-primary-dark">예약하기</CommonButton>
    </PaddedLayout>
  );
}
