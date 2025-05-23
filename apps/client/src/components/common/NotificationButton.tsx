import { Bell } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function NotificationButton() {
  return (
    <Link href="#">
      <Bell className="text-primary" strokeWidth={3} size={24} />
    </Link>
  );
}
