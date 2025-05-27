import { MyPageMenuDataType } from '@/types/initialDataTypes';
import { PaddedLayout } from '@repo/ui/components/common/CommonLayouts';
import { ChevronRight } from 'lucide-react';

export default function MenuLinkList({
  menus,
}: {
  menus: MyPageMenuDataType[];
}) {
  return (
    <PaddedLayout>
      {menus.map((menu, index) => (
        <div key={index} className="py-4 flex justify-between">
          {menu.label}
          <ChevronRight className="text-gray-3 my-auto" size={20} />
        </div>
      ))}
    </PaddedLayout>
  );
}
