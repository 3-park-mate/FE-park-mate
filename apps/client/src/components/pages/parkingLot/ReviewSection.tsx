import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';
import ReviewItem from './ReviewItem';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@repo/ui/components/base/button';

export default function ReviewSection() {
  return (
    <PaddedSection className="bg-white py-7">
      <h2 className="text-lg font-semibold">
        방문자 리뷰 <span className="text-gray-3 text-base">349</span>
      </h2>
      <section className="py-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <ReviewItem />
            {index !== 2 && <hr className="my-2" />}
          </div>
        ))}
        <Link
          href="#"
          className={`${buttonVariants({ variant: 'default' })} w-full h-10 bg-white !text-black mt-4`}
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
        >
          리뷰 전체보기 <ChevronRight />
        </Link>
      </section>
    </PaddedSection>
  );
}
