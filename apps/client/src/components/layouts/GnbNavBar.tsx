'use client';

import ParkingMarkerIcon from '@repo/ui/components/icon/ParkingMarkerIcon';
import { Bookmark, Home, MessageSquareText, User } from 'lucide-react';
import React from 'react';
import { GnbMenu } from './GnbMenu';

export default function GnbNavBar() {
  return (
    <div>
      <div className="fixed bottom-0 rounded-t-5xl max-w-[600px] w-full h-[6.5rem] bg-gradient-to-t from-primary" />
      <nav className="fixed bottom-0 rounded-t-3xl max-w-[600px] w-full h-[4.688rem] bg-white">
        <ul className="relative flex items-center justify-evenly px-2 h-full">
          <GnbMenu id="/" link="./" icon={Home} />
          <GnbMenu id="/myReservation" link="./myReservation" icon={Bookmark} />
          <GnbMenu id="/map" link="./" icon={ParkingMarkerIcon} main />
          <GnbMenu id="/chat" link="./" icon={MessageSquareText} />
          <GnbMenu id="/my-page" link="./my-page" icon={User} />
        </ul>
      </nav>
    </div>
  );
}
