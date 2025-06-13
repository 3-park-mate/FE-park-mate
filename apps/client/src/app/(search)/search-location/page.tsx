import SearchLocationSection from '@/components/pages/search/SearchLocationSection';
import React, { Suspense } from 'react';

export default function page() {
  return (
    <main className="relative min-h-screen bg-gray-light-3">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchLocationSection />
      </Suspense>
    </main>
  );
}
