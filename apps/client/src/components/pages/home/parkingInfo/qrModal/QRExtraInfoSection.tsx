import { PaddedSection } from '@repo/ui/components/common/CommonLayouts';

export default function QRExtraInfoSection({
  timeItems,
  infoItems,
}: {
  timeItems: { label: string; time: string; date: string }[];
  infoItems: { label: string; value: string }[];
}) {
  return (
    <PaddedSection>
      <div className="flex gap-4">
        {timeItems.map(({ label, time, date }) => (
          <div key={label} className="w-1/2">
            <p className="text-gray-2 text-15px pb-2">{label}</p>
            <div className="bg-gray-light-1 rounded-lg px-4 py-3">
              <p className="font-semibold">{time}</p>
              <p className="text-gray-2 text-15px">{date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 py-4">
        {infoItems.map(({ label, value }, index) => (
          <div
            key={label}
            className={`w-1/3 pr-4 ${
              index !== infoItems.length - 1 ? 'border-r border-gray-200' : ''
            }`}
          >
            <p className="text-gray-2 text-15px pb-2">{label}</p>
            <p className="font-semibold ms-0.5">{value}</p>
          </div>
        ))}
      </div>
    </PaddedSection>
  );
}
