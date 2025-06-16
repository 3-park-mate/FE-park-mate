import { MyPageMenuDataType } from '@/types/initialDataTypes';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MenuLinkList({
  menus,
}: {
  menus: MyPageMenuDataType[];
}) {
  return (
    <PaddedLayout>
      {menus.map((menu, index) => (
        <Link
          href={menu.href}
          key={index}
          className="py-4 flex justify-between text-15px"
        >
          {menu.label}
          <ChevronRight className="text-gray-3 my-auto" size={18} />
        </Link>
      ))}
    </PaddedLayout>
  );
}
