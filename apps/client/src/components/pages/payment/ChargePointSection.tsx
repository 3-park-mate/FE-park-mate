'use client';
import { PaddedSectionWithTitle } from '@repo/ui/components/common/CommonLayouts';
import CommonInputWithLabel from '@repo/ui/components/common/CommonInputWithLabel';
import { useState } from 'react';
import { Button } from '@repo/ui/components/base/button';

export default function ChargePointSection() {
  const [chargeAmount, setChargeAmount] = useState<number | string>('');
  const currentPoints = 12000;

  const handleAddAmount = (amountToAdd: number) => {
    const currentInputValue = Number(chargeAmount) || 0;
    setChargeAmount(currentInputValue + amountToAdd);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setChargeAmount('');
    } else if (!isNaN(Number(value))) {
      setChargeAmount(Number(value));
    }
  };

  const amounts = [
    { label: '5천', value: 5000 },
    { label: '1만', value: 10000 },
    { label: '2만', value: 20000 },
    { label: '3만', value: 30000 },
    { label: '5만', value: 50000 },
    { label: '10만', value: 100000 },
  ];

  return (
    <div>
      <section className="bg-gray-light-1 p-6">
        <p className="text-gray-3 text-15px">보유 포인트</p>
        <h2 className="text-2xl font-semibold">
          {currentPoints.toLocaleString()}원
        </h2>
      </section>

      <PaddedSectionWithTitle title="충전 금액" className="space-y-5">
        <CommonInputWithLabel
          label="직접 입력"
          placeholder="직접 입력 (최소 5,000원)"
          type="number"
          value={chargeAmount}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-3 gap-3">
          {amounts.map((item) => (
            <Button
              key={item.value}
              type="button"
              variant="outline"
              onClick={() => handleAddAmount(item.value)}
              className="rounded-md"
            >
              +{item.label.toLocaleString()}원
            </Button>
          ))}
        </div>
      </PaddedSectionWithTitle>
    </div>
  );
}
