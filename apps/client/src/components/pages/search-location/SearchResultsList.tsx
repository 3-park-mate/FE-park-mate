import { SearchResultsListProps } from '@/types/filterInfoType';

export default function SearchResultsList({
  searchResults,
}: SearchResultsListProps) {
  return (
    <div className="w-full pl-12 pr-6 max-h-screen overflow-y-scroll z-50">
      <p className="sticky top-0 bg-white text-right text-xs">검색결과</p>
      <ul className="">
        {searchResults.map((data, index) => (
          <li
            key={`${data.content}-${index}`}
            className="h-14 content-center cursor-pointer"
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
