import React from 'react';
import { useParkingFilterStore } from '@/store/useParkingFilterStore';
import { SearchResultsListProps } from '@/types/filterInfoType';

export default function SearchLocationResults({
  searchResults,
  setSearchResults,
  setInputValue,
}: SearchResultsListProps) {
  const setMapCenter = useParkingFilterStore((state) => state.setMapCenter);

  return (
    <div className="w-full h-100 overflow-y-scroll ">
      <p className="sticky top-0 bg-white text-right text-xs">검색결과</p>
      <ul className="">
        {searchResults.map((data, index) => (
          <li
            key={`${data.content}-${index}`}
            className="h-14 border-b-1 content-center"
            onMouseDown={() => {
              setSearchResults([]);
              setInputValue(data.content);
              setMapCenter(data.position.lat, data.position.lng, data.content);
            }}
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
