// components/AlertBell.tsx
'use client';
import { useCustomSession } from '@/context/SessionContext';
import { cn } from '@repo/ui/lib/utils';
import { BellIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useNotificationStore } from '@/store/useNotificationStore';
import {
  initializeFcmClient,
  requestNotificationPermissionAndGetToken,
} from '@/lib/fcmClient';

export default function AlertBell({ className }: { className?: string }) {
  const isSession = useCustomSession();
  const { unreadCount, fetchUnreadCount } = useNotificationStore(); // onNotificationReceived는 initializeFcmClient에서 직접 호출

  useEffect(() => {
    if (isSession) {
      initializeFcmClient();
      requestNotificationPermissionAndGetToken();
      fetchUnreadCount();

      if ('serviceWorker' in navigator) {
        const messageListener = (event: MessageEvent) => {
          if (event.data && event.data.type === 'notification-received') {
            fetchUnreadCount();
          }
        };
        navigator.serviceWorker.addEventListener('message', messageListener);

        return () => {
          navigator.serviceWorker.removeEventListener(
            'message',
            messageListener
          );
        };
      }
    }
  }, [isSession, fetchUnreadCount]);

  if (!isSession) {
    return null;
  }

  const count = Number(unreadCount);

  return (
    <Link href="/notifications" className="relative">
      <BellIcon className="size-[24px]" />
      {count > 0 && (
        <span className="absolute -top-2 -right-1 w-[18px] h-[18px]">
          <span className="absolute w-full h-full rounded-full bg-red-2 animate-ping opacity-40"></span>
          <span
            className={cn(
              'w-full h-full rounded-full bg-red-2 text-white text-[0.625rem] text-center font-semibold flex items-center justify-center',
              className
            )}
          >
            {count}
          </span>
        </span>
      )}
    </Link>
  );
}
