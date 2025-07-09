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
import { DailySales } from '@/types/hostDataTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsChart({
  dailySalesList,
}: {
  dailySalesList: DailySales[];
}) {
  const labels = dailySalesList.map((item) => item.date);
  const amounts = dailySalesList.map((item) => item.amount);

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
    <div className="h-[300px] w-full p-3">
      <Bar options={options} data={data} />
    </div>
  );
}
