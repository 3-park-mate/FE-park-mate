'use client';

import TabMenuWithIcon from '@/components/layouts/TabMenuWithIcon';
import { searchMenuListData } from '@/data/searchDatas';

export default function SearchHeader() {
  return (
    <header className="sticky top-0 w-full z-50">
      <TabMenuWithIcon tabMenuList={searchMenuListData} closeButton={true} />
    </header>
  );
}
