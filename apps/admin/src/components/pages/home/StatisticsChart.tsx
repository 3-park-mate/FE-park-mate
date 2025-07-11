'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import type { Scale } from 'chart.js';
import { parkingStatisticsDataType } from '@/types/hostDataTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsChart({
  staticData,
}: {
  staticData?: parkingStatisticsDataType;
}) {
  if (
    !staticData ||
    !staticData.dailySalesList ||
    staticData.dailySalesList.length === 0
  ) {
    return (
      <div className="h-[300px] w-full min-w-[320px] overflow-x-auto flex items-center justify-center bg-white rounded-2xl shadow-2xl">
        <p className="text-gray-500">데이터가 없습니다.</p>
      </div>
    );
  }

  const labels = staticData.dailySalesList.map((item) => item.date);
  const amounts = staticData.dailySalesList.map((item) => item.amount);

  const data = {
    labels: labels,
    datasets: [
      {
        label: '일별 매출',
        data: amounts,
        backgroundColor: 'rgba(72, 142, 255, 0.756)',
        borderColor: 'rgba(72, 142, 255, 0.756)',
        borderWidth: 0,
        borderRadius: {
          topLeft: 7,
          topRight: 7,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawOnChartArea: false,
          borderColor: 'transparent',
        },
        ticks: {
          callback: function (
            this: Scale,
            val: string | number,
            _index: number
          ) {
            const dateStr = this.getLabelForValue(val as number);
            const date = new Date(dateStr);
            return `${date.getDate()}일`;
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          borderDash: [5, 5],
          drawBorder: false,
        },
        title: {
          display: false,
        },
        ticks: {
          display: false,
          callback: function (value: string | number) {
            const numValue =
              typeof value === 'string' ? parseFloat(value) : value;
            if (numValue >= 100000000) {
              return (numValue / 100000000).toLocaleString('ko-KR') + '억원';
            }
            if (numValue >= 10000) {
              return (numValue / 10000).toLocaleString('ko-KR') + '만원';
            }
            return numValue.toLocaleString('ko-KR') + '원';
          },
          padding: 10,
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="p-3">
      <div className="h-[300px] w-full mb-1">
        <Bar options={options} data={data} />
      </div>
      <p className="text-center font-semibold text-15px text-gray-800">
        {staticData.parkingLotName || '내 주차장'}
      </p>
    </div>
  );
}
