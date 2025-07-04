'use client';

import { useEffect } from 'react';
import { useLocationStore } from '@/store/useLocationStore';

export function LocationInitializer() {
  const { latitude, longitude, fetchCurrentLocation } = useLocationStore();

  useEffect(() => {
    if (latitude == null || longitude == null) {
      fetchCurrentLocation();
      // startWatchingLocation();
    }
  }, [latitude, longitude, fetchCurrentLocation]);

  return null;
}
