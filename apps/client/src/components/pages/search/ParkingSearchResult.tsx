import { ParkingSearchDataType } from '@/types/parkingDataTypes';
import DotSpinner from '@repo/ui/components/icon/DotSpinner';
import { useEffect } from 'react';
import MapRedirectButton from './MapRedirectButton';
import { MapPin } from 'lucide-react';
import { cn } from '@repo/ui/lib/utils';

export default function ParkingSearchResult({
  inputValue,
  isLoading,
  searchResults,
  setIsScrolled,
}: {
  inputValue: string;
  isLoading: boolean;
  searchResults: ParkingSearchDataType[];
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
  }, [setIsScrolled]);

  if (searchResults.length === 0) return;

  if (isLoading) {
    return (
      <section>
        <ul className="px-3 pt-2 pb-10 rounded-xl">
          <DotSpinner />
        </ul>
      </section>
    );
  }

  return (
    <section>
      <ul className="px-3 pt-2 pb-10 rounded-xl">
        <div className="w-full relative">
          <p className="text-xl font-semibold px-5 mb-4">
            `{inputValue}`
            <span className="px-2 text-[1.2rem] font-medium">검색결과</span>
          </p>
          <ul className="bg-white rounded-lg">
            {searchResults.map((data, index) => (
              <li key={index}>
                <MapRedirectButton
                  icon={MapPin}
                  IconclassName="fill-none stroke-1 bg-gray-light-2/70 size-12 p-2.5"
                  className="border-0"
                  label={data.name}
                  subText={data.address}
                  position={{ lat: data.latitude, lng: data.longitude }}
                />
                <hr
                  className={cn(
                    'border-t border-gray-200 mx-5',
                    index === searchResults.length - 1 && 'border-none'
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </section>
  );
}
