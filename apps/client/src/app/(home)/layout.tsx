import ParkmateLogo from '@repo/ui/components/icon/ParkmateLogo';
import { Bell } from 'lucide-react';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative">
      <header className="px-5 flex justify-between pt-10 pb-11">
        <ParkmateLogo />
        <Bell className="text-primary" strokeWidth={3} size={24} />
      </header>
      {children}
    </div>
  );
}
