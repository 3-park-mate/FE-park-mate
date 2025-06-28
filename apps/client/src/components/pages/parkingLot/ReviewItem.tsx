import { Rating } from '@repo/ui/components/common/CommonLayouts';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

export default function ReviewItem() {
  return (
    <div className="py-3">
      <p>홍*동</p>
      <Rating className="!text-sm">
        <span className="">4.5</span>
        <span className="text-gray-3 text-sm ms-1">23.4.21</span>
      </Rating>
      <div className="flex justify-between">
        <p className="text-15px text-gray-2 pt-2">
          여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다. 여기에
          리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다.
        </p>
        <div className="relative rounded-md w-24 h-24 ml-3 flex-shrink-0">
          <Image
            src="https://dummyimage.com/96x96"
            alt="리뷰 이미지"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-2.5">
        <button className="flex gap-1 text-sm text-gray-3 cursor-pointer">
          <ThumbsUp size={16} fill="currentColor" className="text-gray-1" />
          <span>11</span>
        </button>
        <button className="flex gap-1 text-sm text-gray-3 cursor-pointer">
          <ThumbsDown size={16} fill="currentColor" className="text-gray-1" />
          <span>9</span>
        </button>
      </div>
    </div>
  );
}
