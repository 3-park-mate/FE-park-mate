'use client';

import { useEffect } from 'react';
import { initializeFcmClient } from '@/lib/fcmClient';

export function FcmInitializer() {
  useEffect(() => {
    initializeFcmClient();
  }, []);

  return null;
}
