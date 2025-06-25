'use client';
import { useEffect, useRef, useState } from 'react';
import { parkingSettingsTabMenus } from '@/data/initialDatas';
import { ParkingSettingsTabMenu } from './ParkingSettingsTabMenu';

export default function ParkingSettingsTabBar() {
  const tabRef = useRef<HTMLUListElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const [activeId, setActiveId] = useState<string>('operation');
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!tabRef.current) return;

      const { top } = tabRef.current.getBoundingClientRect();
      setIsStuck(top <= 74);
      console.log('top: ', top);

      const offsets = parkingSettingsTabMenus.map(({ id }) => {
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
        top: section.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ul
      ref={tabRef}
      className={`mx-4 px-1.5 rounded-2xl sticky top-[70px] z-10 flex justify-center bg-inner-background-gray ${
        isStuck ? 'shadow-md' : ''
      }`}
    >
      {parkingSettingsTabMenus.map((menu) => (
        <ParkingSettingsTabMenu
          key={menu.id}
          tabMenuName={menu.label}
          selected={menu.id === activeId}
          onClick={() => onClickTab(menu.id)}
        />
      ))}
    </ul>
  );
}
