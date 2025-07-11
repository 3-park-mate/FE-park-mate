'use client';

import { useState } from 'react';
import SearchInputSection from './SearchInputSection';
import { useAlertWithLoading } from '@/hooks/useAlertWithLoading';
import AlertModal from '@repo/ui/components/common/AlertModal';
import ParkingSearchResult from './ParkingSearchResult';
import { getParkingSearchDatas } from '@/actions/parking/parking-service';
import { ParkingSearchDataType } from '@/types/parkingDataTypes';
import { PAGE_SIZE } from '@/constants/constants';

export default function SearchParkingForm() {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<ParkingSearchDataType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const { alertModalOpen, setAlertModalOpen, modalMessage, handleAlert } =
    useAlertWithLoading();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedInputValue = inputValue.trim();

    if (!trimmedInputValue) {
      handleAlert('검색어를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setSearchResults([]);

    try {
      const res = await getParkingSearchDatas({
        size: PAGE_SIZE,
        keyword: trimmedInputValue,
        cursor: undefined,
      });

      if (res.success && res.data) {
        setSearchResults(res.data.content);
      }
    } catch (_error) {
      handleAlert('검색 중 오류가 발생했습니다.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
        errorMessage={modalMessage}
      />
      <form onSubmit={handleSubmit}>
        <SearchInputSection
          inputValue={inputValue}
          setInputValue={setInputValue}
          type="parking"
        />
      </form>
      <ParkingSearchResult
        inputValue={inputValue}
        isLoading={isLoading}
        searchResults={searchResults}
        setIsScrolled={() => {}}
      />
    </>
  );
}
