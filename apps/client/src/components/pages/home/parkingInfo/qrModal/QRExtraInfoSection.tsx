import { cn } from '@repo/ui/lib/utils';

export default function QRExtraInfoSection({
  timeItems,
  infoItems,
  className,
}: {
  timeItems: { label: string; time: string; date: string }[];
  infoItems: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <section className={cn(className)}>
      <div className="flex gap-4">
        {timeItems.map(({ label, time, date }) => (
          <div key={label} className="w-1/2">
            <p className="text-gray-2 text-sm pb-2">{label}</p>
            <div className="bg-gray-light-1 rounded-lg px-4 py-3">
              <p className="font-semibold text-15px">{time}</p>
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
            <p className="text-gray-2 text-sm pb-2">{label}</p>
            <p className="font-semibold text-15px ms-0.5">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
