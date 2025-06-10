'use client';
import { useEffect, useRef, useState } from 'react';
import { HomeTabMenu } from '../home/HomeTabMenu';
import { parkingDetailTabMenus } from '@/data/initialDatas';

export default function ParkingDetailTabBar() {
  const tabRef = useRef<HTMLUListElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [activeId, setActiveId] = useState<string>('options');
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!tabRef.current) return;

      const { top } = tabRef.current.getBoundingClientRect();
      setIsStuck(top <= 56);

      const offsets = parkingDetailTabMenus.map(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return { id, top: Infinity };
        const rect = section.getBoundingClientRect();
        return { id, top: rect.top };
      });

      const threshold = 120;
      const visible = offsets
        .filter((o) => o.top <= threshold)
        .sort((a, b) => b.top - a.top);

      if (visible.length > 0) {
        const newActiveId = visible[0]?.id;
        if (newActiveId && newActiveId !== activeIdRef.current) {
          setActiveId(newActiveId);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onClickTab = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 110,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  return (
    <ul
      ref={tabRef}
      className={`sticky top-[55px] z-10 flex justify-between bg-inner-background-gray ${
        isStuck ? 'shadow-md' : ''
      }`}
    >
      {parkingDetailTabMenus.map((menu) => (
        <HomeTabMenu
          key={menu.id}
          tabMenuName={menu.label}
          selected={menu.id === activeId}
          onClick={() => onClickTab(menu.id)}
        />
      ))}
    </ul>
  );
}
