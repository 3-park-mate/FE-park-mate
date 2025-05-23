import Image from 'next/image';
import Link from 'next/link';

export default function MenuButtonArea({
  items,
}: {
  items: { icon: string; label: string; href: string }[];
}) {
  return (
    <ul className="flex justify-between px-6">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-1 items-center">
          <Link
            href={item.href}
            className="w-14 h-14 bg-gray-light-1 rounded-[20px] flex justify-center items-center"
          >
            <Image src={item.icon} alt={item.label} width={33} height={33} />
          </Link>
          <p className="font-light text-xs">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}
