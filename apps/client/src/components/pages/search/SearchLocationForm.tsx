'use client';

import { useCallback, useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { searchLocationByKeywordUtil } from '@/utils/mapUtils';
import SearchInputSection from './SearchInputSection';
import SearchResultSection from './SearchResultSection';
import { SearchLocationResultType } from '@/types/searchDataTypes';

export default function SearchLocationForm() {
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '',
    libraries: ['services', 'clusterer'],
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<
    SearchLocationResultType[]
  >([]);

  const fetchSearchResults = useCallback(async (keyword: string) => {
    if (keyword.trim() === '') {
      setSearchResults([]);
      setIsScrolled(false);
      return;
    }
    const results = await searchLocationByKeywordUtil(keyword);
    setSearchResults(results);
  }, []);

  useEffect(() => {
    if (loading) return;
    fetchSearchResults(inputValue);
  }, [inputValue, loading, fetchSearchResults]);

  return (
    <>
      <SearchInputSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        isScrolled={isScrolled}
      />
      <SearchResultSection
        inputValue={inputValue}
        searchResults={searchResults}
        setIsScrolled={setIsScrolled}
      />
    </>
  );
}
