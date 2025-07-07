import SearchLocationForm from '@/components/pages/search/SearchLocationForm';
import { Suspense } from 'react';

export default function page() {
  return (
    <main className="min-h-screen bg-gray-light-3">
      <Suspense fallback={<div>로딩중...</div>}>
        <SearchLocationForm />
      </Suspense>
    </main>
  );
}
