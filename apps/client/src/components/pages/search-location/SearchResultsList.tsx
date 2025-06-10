'use client';

import { SearchLocationResultType } from '@/types/filterInfoType';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchResultsList({
  results,
  keyword,
  setIsScrolled,
}: {
  results: SearchLocationResultType[];
  keyword: string;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full relative">
      <p className="text-xl font-semibold px-5 py-2">
        '{keyword}'
        <span className="px-2 text-[1.2rem] font-medium">검색결과</span>
      </p>
      <ul className="bg-white rounded-lg">
        {results.map((data, index) => (
          <li
            key={index}
            className="cursor-pointer"
            onClick={() =>
              router.push(
                `/map?lat=${data.position.lat}&lng=${data.position.lng}`
              )
            }
          >
            <div className="px-6 py-5">
              <p className="font-medium leading-tight">{data.content}</p>
              <p className="text-sm text-gray-2 leading-tight">
                {data.road_address_name}
              </p>
            </div>
            <hr
              className={cn(
                'border-t border-gray-200 mx-5',
                index === results.length - 1 && 'border-none'
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
