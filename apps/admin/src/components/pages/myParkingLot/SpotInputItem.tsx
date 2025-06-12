import { Input } from '@repo/ui/components/base/input';
import Image from 'next/image';

export default function SpotInputItem({
  src,
  alt,
  label,
  name,
  value,
  onChange,
}: {
  src: string;
  alt: string;
  label: string;
  name: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="relative w-1/2 aspect-square max-w-[200px] rounded-lg border flex-shrink-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="250px"
          className="p-2 object-contain"
        />
        <span className="absolute top-2 left-2 border border-secondary text-secondary font-semibold text-sm px-2 py-0.5 rounded-2xl z-10">
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-2 items-center text-sm text-gray-2">
        <p>총</p>
        <Input
          type="text"
          className="w-30 !text-2xl text-center font-bold text-secondary"
          placeholder="0"
          name={name}
          value={value}
          onChange={onChange}
        />
        <p>개 면수</p>
      </div>
    </div>
  );
}
