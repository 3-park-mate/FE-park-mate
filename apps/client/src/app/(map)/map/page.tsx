import MainMap from '@/components/pages/map/MainMap';
import CarLoader from '@repo/ui/components/common/CarLoader';
import { Suspense } from 'react';

export default function page() {
  return (
    <main className="relative">
      <Suspense fallback={<CarLoader />}>
        <MainMap />
      </Suspense>
    </main>
  );
}
