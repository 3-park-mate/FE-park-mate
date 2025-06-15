import { SearchLocationResultType } from '@/types/filterInfoType';
import MapRedirectButton from './MapRedirectButton';
import SearchResultCardList from './SearchResultCardList';

export default function SearchResultSection({
  inputValue,
  searchResults,
  setIsScrolled,
}: {
  inputValue: string;
  searchResults: SearchLocationResultType[];
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section>
      <ul className="px-3 pt-2 pb-10 rounded-xl">
        {inputValue.trim() === '' ? (
          <MapRedirectButton
            label="근처"
            subText={`현재 내 주변에서\n주차 가능한 주차장을 찾아보세요.`}
            IconclassName="rotate-90 fill-none stroke-primary bg-primary/15"
            className="border-0 bg-white/80"
          />
        ) : (
          <SearchResultCardList
            results={searchResults}
            keyword={inputValue}
            setIsScrolled={setIsScrolled}
          />
        )}
      </ul>
    </section>
  );
}
