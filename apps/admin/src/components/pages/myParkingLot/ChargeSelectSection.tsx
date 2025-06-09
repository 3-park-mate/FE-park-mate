import React from 'react';
import ChargingTypeSelector from './ChargingTypeSelector';
import {
  CommonButton,
  TextBadge,
} from '@repo/ui/components/common/CommonLayouts';
import { Plus } from 'lucide-react';
import ACSingleIcon from '@repo/ui/components/icon/ACSingleIcon';
import ACThreePhaseIcon from '@repo/ui/components/icon/ACThreePhaseIcon';
import DCChademoIcon from '@repo/ui/components/icon/DCChademoIcon';
import DCComboIcon from '@repo/ui/components/icon/DCComboIcon';

export default function ChargeSelectSection() {
  const chargingTypes = [
    { icon: ACSingleIcon, label: 'AC단상' },
    { icon: ACThreePhaseIcon, label: 'AC3상' },
    { icon: DCChademoIcon, label: 'DC차데모' },
    { icon: DCComboIcon, label: 'DC콤보' },
  ];

  return (
    <section className="space-y-5">
      <div className="flex justify-center gap-3">
        {chargingTypes.map(({ icon: Icon, label }, index) => (
          <div key={index} className="flex flex-col items-center">
            <Icon size={45} />
            <TextBadge>{label}</TextBadge>
          </div>
        ))}
      </div>
      <ChargingTypeSelector index={0} />
      <ChargingTypeSelector index={1} />
      <CommonButton className="bg-white text-gray-2 border">
        <Plus className="w-4 h-4 shrink-0" />
        <span>주차면 추가하기</span>
      </CommonButton>
      <hr />
      <p className="text-right px-3">
        <span className="text-gray-2 text-sm">전체 전기차 충전 주차면수</span>
        <span className="font-semibold text-3xl text-secondary ms-2">3</span>
      </p>
    </section>
  );
}
