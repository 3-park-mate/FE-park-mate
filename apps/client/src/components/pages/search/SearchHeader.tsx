'use client';

import TabMenuWithIcon from '@/components/layouts/TabMenuWithIcon';
import { searchMenuListData } from '@/data/searchDatas';

export default function SearchHeader() {
  return (
    <header>
      <TabMenuWithIcon tabMenuList={searchMenuListData} closeButton={true} />
    </header>
  );
}
