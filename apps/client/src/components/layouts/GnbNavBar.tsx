'use client';

import { GnbMenu } from './GnbMenu';
import { gnbMenuData } from '@/data/gnbMenuData';
import { useGnbNavBarStore } from '@/store/useGnbNavBarStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GnbNavBar() {
  const pathname = usePathname();

  const active = useGnbNavBarStore((state) => state.active);
  const setActive = useGnbNavBarStore((state) => state.setGnbNavBar);

  useEffect(() => {
    if (pathname !== '/map') {
      setActive(true);
    }
  }, [pathname, setActive]);

  return (
    active && (
      <section className="z-50">
        <div className="fixed bottom-0 rounded-t-5xl max-w-[600px] w-full h-[80px] bg-gradient-to-t from-primary" />
        <nav className="fixed bottom-0 rounded-t-3xl max-w-[600px] w-full h-[60px] bg-white">
          <ul className="relative flex items-center justify-between h-full px-5">
            {gnbMenuData.map((menu) => (
              <GnbMenu
                key={menu.menuName}
                menuName={menu.menuName}
                link={menu.link}
                icon={menu.icon}
                main={menu.main || false}
              />
            ))}
          </ul>
        </nav>
      </section>
    )
  );
}
