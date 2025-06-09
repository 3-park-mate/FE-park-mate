import { Input } from '@repo/ui/components/base/input';
import Image from 'next/image';

export default function SpotCountSelectSection() {
  return (
    <>
      <section className="border rounded-xl p-5">
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
      </section>
      <section className="space-y-4 py-4">
        {[
          { src: '/img/small-car.webp', alt: 'Small Car', label: '경차' },
          {
            src: '/img/compact-car.webp',
            alt: 'Compact Car',
            label: '소형차',
          },
          {
            src: '/img/standard-car.png',
            alt: 'Standard Car',
            label: '중형차',
          },
          { src: '/img/large-car.jpg', alt: 'Large Car', label: '대형차' },
        ].map(({ src, alt, label }) => (
          <div key={label} className="flex items-center justify-center gap-6">
            <div className="relative w-1/2 aspect-square max-w-[200px] rounded-lg border flex-shrink-0">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="250px"
                className="p-2 object-contain"
              />
              <span
                className="absolute top-2 left-2 border border-secondary text-secondary font-semibold text-sm 
              px-2 py-0.5 rounded-2xl z-10"
              >
                {label}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center text-sm text-gray-2">
              <p>총</p>
              <Input
                type="text"
                className="w-30 !text-2xl text-center font-bold text-secondary"
                placeholder="0"
              />
              <p>개 면수</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
