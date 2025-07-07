'use client';

import { useState } from 'react';
import SearchInputSection from './SearchInputSection';

export default function SearchParkingForm() {
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <SearchInputSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        type="parking"
      />
    </>
  );
}
