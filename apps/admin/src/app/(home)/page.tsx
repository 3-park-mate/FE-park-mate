import MyParkingLotSection from '@/components/pages/home/MyParkingLotSection';
import StatisticsSection from '@/components/pages/home/StatisticsSection';

const dummyDailySalesData = [
  { date: '2024-06-01', amount: 45000 },
  { date: '2024-06-02', amount: 44000 },
  { date: '2024-06-03', amount: 52000 },
  { date: '2024-06-04', amount: 45000 },
  { date: '2024-06-05', amount: 47000 },
  { date: '2024-06-06', amount: 50000 },
  { date: '2024-06-07', amount: 49000 },
];

export default function Home() {
  return (
    <main>
      <StatisticsSection dailySalesList={dummyDailySalesData} />
      <MyParkingLotSection />
    </main>
  );
}
