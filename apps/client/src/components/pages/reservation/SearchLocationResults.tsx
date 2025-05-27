import React from 'react';
import { searchLocationResultType } from './LocationInfoBox';

interface SearchResultsListProps {
  searchResults: searchLocationResultType[];
  onSelect: (location: searchLocationResultType) => void;
}

export default function SearchResultsList({
  searchResults,
  onSelect,
}: SearchResultsListProps) {
  return (
    <div className="w-full h-100 overflow-y-scroll ">
      <p className="sticky top-0 bg-white text-right text-xs">검색결과</p>
      <ul className="">
        {searchResults.map((data, index) => (
          <li
            key={`${data.content}-${index}`}
            className="h-14 border-b-1 content-center"
            onClick={() => onSelect(data)}
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
