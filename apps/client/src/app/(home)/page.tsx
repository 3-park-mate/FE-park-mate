import { HomeTabMenuBar } from '@/components/pages/home/HomeTabMenuBar';
import UsageStatusSection from '@/components/pages/home/UsageStatusSection';

export default function page() {
  return (
    <main>
      <HomeTabMenuBar
        tabContents={{
          reservationParking: <div>예약 주차장 화면</div>,
          currentParking: <UsageStatusSection />,
        }}
      />
    </main>
  );
}
