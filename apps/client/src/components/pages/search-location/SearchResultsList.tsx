'use client';

import { SearchLocationResultsType } from '@/types/filterInfoType';
import { useRouter } from 'next/navigation';

export default function SearchResultsList({
  results,
}: SearchLocationResultsType) {
  const router = useRouter();
  return (
    <div className="w-full pl-12 pr-6 max-h-screen overflow-y-scroll z-50">
      <p className="sticky top-0 bg-white text-right text-xs">검색결과</p>
      <ul className="">
        {results.map((data, index) => (
          <li
            key={index}
            className="h-14 content-center cursor-pointer"
            onClick={() =>
              router.push(
                `/map?lat=${data.position.lat}&lng=${data.position.lng}`
              )
            }
          >
            <p className="font-medium leading-tight mt-2">{data.content}</p>
            <p className="text-sm text-gray-2 leading-tight mb-2">
              {data.road_address_name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
