import Image from 'next/image';
import Link from 'next/link';

export default function MenuButton({
  item,
}: {
  item: { icon: string; label: string; href: string };
}) {
  return (
    <Link href={item.href} className="flex flex-col gap-1 items-center w-fit">
      <div className="w-14 h-14 bg-gray-light-1 rounded-[20px] flex justify-center items-center">
        <Image src={item.icon} alt={item.label} width={33} height={33} />
      </div>
      <p className="font-light text-xs">{item.label}</p>
    </Link>
  );
}
