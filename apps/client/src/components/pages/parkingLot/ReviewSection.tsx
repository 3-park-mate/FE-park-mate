import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

export default function ReviewSection() {
  return (
    <PaddedSection className="bg-white py-7">
      <h2 className="text-lg font-semibold">
        방문자 리뷰 <span className="text-gray-3 text-base">349</span>
      </h2>
      <section className="space-y-3 py-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <div className="py-3">
              <p className="pb-1">
                홍*동
                <span className="text-gray-3 text-sm ms-2">
                  5.30 · 1시간 이용
                </span>
              </p>
              <div className="flex justify-between">
                <p className="text-15px text-gray-2 pt-2">
                  여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다.
                  여기에 리뷰 내용이 들어갑니다. 여기에 리뷰 내용이 들어갑니다.
                </p>
                <div className="relative rounded-md w-24 h-24 ml-2 flex-shrink-0">
                  <Image
                    src="https://dummyimage.com/155x102"
                    alt="리뷰 이미지"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <p className="flex gap-1 text-sm text-gray-3">
                  <ThumbsUp
                    size={16}
                    fill="currentColor"
                    className="text-gray-1"
                  />
                  11
                </p>
                <p className="flex gap-1 text-sm text-gray-3">
                  <ThumbsDown
                    size={16}
                    fill="currentColor"
                    className="text-gray-1"
                  />
                  9
                </p>
              </div>
            </div>
            {index !== 2 && <hr className="my-2" />}
          </div>
        ))}
      </section>
    </PaddedSection>
  );
}
