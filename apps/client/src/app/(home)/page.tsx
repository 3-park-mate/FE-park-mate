import { HomeTabMenuBar } from '@/components/pages/home/HomeTabMenuBar';

export default function page() {
  return (
    <main>
      <HomeTabMenuBar
        children={{
          reservationParking: <div>예약 주차장 화면</div>,
          currentParking: <div>이용중 주차장 화면</div>,
        }}
      />
    </main>
  );
}
