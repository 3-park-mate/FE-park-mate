import { Checkbox } from '@repo/ui/components/base/checkbox';
import ACSingleIcon from '@repo/ui/components/icon/ACSingleIcon';
import ACThreePhaseIcon from '@repo/ui/components/icon/ACThreePhaseIcon';
import DCChademoIcon from '@repo/ui/components/icon/DCChademoIcon';
import DCComboIcon from '@repo/ui/components/icon/DCComboIcon';

const chargingTypes = [
  { key: 'acSingle', icon: ACSingleIcon, label: 'AC단상' },
  { key: 'acThreePhase', icon: ACThreePhaseIcon, label: 'AC3상' },
  { key: 'dcChademo', icon: DCChademoIcon, label: 'DC차데모' },
  { key: 'dcCombo', icon: DCComboIcon, label: 'DC콤보' },
];

export default function ChargingTypeSelector({ index }: { index: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 border rounded-xl p-4">
      <p className="w-full text-center text-sm text-gray-2 mb-3">
        주차면 {index + 1}
      </p>
      <div className="grid grid-cols-2 gap-2 w-full max-w-[400px]">
        {chargingTypes.map(({ key, icon: Icon, label }) => (
          <label
            key={key}
            htmlFor={`spots.${index}.${key}`}
            className="flex items-center justify-between cursor-pointer select-none border px-3 py-2 rounded-2xl"
          >
            <div className="flex gap-1 items-center">
              <Icon size={16} className="text-gray-2" />
              <p className="text-sm me-1">{label}</p>
            </div>
            <Checkbox
              id={`spots.${index}.${key}`}
              className="w-5 h-5 cursor-pointer
              data-[state=checked]:bg-secondary dark:data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
