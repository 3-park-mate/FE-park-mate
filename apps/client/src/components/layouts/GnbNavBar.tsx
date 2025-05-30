'use client';

import React from 'react';
import { GnbMenu } from './GnbMenu';
import { gnbMenuData } from '@/data/gnbMenuData';

export default function GnbNavBar() {
  return (
    <div>
      <div className="fixed bottom-0 rounded-t-5xl max-w-[600px] w-full h-[6.5rem] bg-gradient-to-t from-primary" />
      <nav className="fixed bottom-0 rounded-t-3xl max-w-[600px] w-full h-[4.688rem] bg-white">
        <ul className="relative flex items-center justify-evenly px-2 h-full">
          {gnbMenuData.map((menu) => (
            <GnbMenu
              key={menu.link}
              link={menu.link}
              icon={menu.icon}
              main={menu.main || false}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
