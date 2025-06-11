'use client';

import { SearchLocationResultType } from '@/types/filterInfoType';
import { cn } from '@repo/ui/lib/utils';
import { useEffect } from 'react';
import MapRedirectButton from './MapRedirectButton';

export default function SearchResultsList({
  results,
  keyword,
  setIsScrolled,
}: {
  results: SearchLocationResultType[];
  keyword: string;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      <ul className="bg-white rounded-lg ">
        {results.map((data, index) => (
          <li key={index}>
            <MapRedirectButton
              key={index}
              type="location"
              label={data.content}
              address={data.road_address_name}
              position={data.position}
            />
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
