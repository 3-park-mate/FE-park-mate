import MainMap from '@/components/pages/map/MainMap';
import CarLoader from '@repo/ui/components/common/CarLoader';
import { Suspense } from 'react';

export default function page() {
  return (
    <main className="relative h-screen max-w-[600px] overflow-hidden">
      <Suspense fallback={<CarLoader />}>
        <MainMap />
      </Suspense>
    </main>
  );
}
