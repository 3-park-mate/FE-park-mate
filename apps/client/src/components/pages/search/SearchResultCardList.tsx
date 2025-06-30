'use client';

import { cn } from '@repo/ui/lib/utils';
import { useEffect } from 'react';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { MapPin } from 'lucide-react';
import MapRedirectButton from './MapRedirectButton';
import { SearchLocationResultType } from '@/types/searchDataTypes';

export default function SearchResultCardList({
  results,
  keyword,
  setIsScrolled,
}: {
  results: SearchLocationResultType[];
  keyword: string;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const resultLength = results.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsScrolled]);

  return (
    <div className="w-full relative">
      <p className="text-xl font-semibold px-5 mb-4">
        `{keyword}`
        <span className="px-2 text-[1.2rem] font-medium">검색결과</span>
      </p>
      {resultLength > 0 ? (
        <ul className="bg-white rounded-lg">
          {results.map((data, index) => (
            <li key={index}>
              <MapRedirectButton
                icon={MapPin}
                IconclassName="fill-none stroke-1 bg-gray-light-2/70 size-12 p-2.5"
                className="border-0"
                label={data.content}
                subText={data.road_address_name}
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
      ) : (
        <DotSpinner className="w-full fill-primary size-12" />
      )}
    </div>
  );
}
