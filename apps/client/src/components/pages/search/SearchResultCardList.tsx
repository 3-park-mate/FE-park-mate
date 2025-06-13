import { SearchLocationResultType } from '@/types/filterInfoType';
import MapRedirectButton from './MapRedirectButton';
import React from 'react';
import { MousePointer2Icon } from 'lucide-react';
import SearchResultsList from './SearchResultsList';

export default function SearchResultCardList({
  inputValue,
  searchResults,
  setIsScrolled,
}: {
  inputValue: string;
  searchResults: SearchLocationResultType[]; // Replace 'any' with the actual type of search results
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section>
      <ul className="px-3 pt-2 pb-10 rounded-xl">
        {inputValue.trim() === '' ? (
          <MapRedirectButton
            label="근처"
            subText={`현재 내 주변에서\n주차 가능한 주차장을 찾아보세요.`}
            icon={MousePointer2Icon}
            IconclassName="rotate-90 fill-none stroke-primary bg-primary/15"
            className="border-0 bg-white/80"
            position={{ lat: undefined, lng: undefined }}
          />
        ) : (
          <SearchResultsList
            results={searchResults}
            keyword={inputValue}
            setIsScrolled={setIsScrolled}
          />
        )}
      </ul>
    </section>
  );
}
