'use client';

import { useEffect } from 'react';
import { useLocationStore } from '@/store/useLocationStore';

export function LocationInitializer() {
  const { latitude, longitude, fetchCurrentLocation, startWatchingLocation } =
    useLocationStore();

  useEffect(() => {
    if (latitude == null || longitude == null) {
      fetchCurrentLocation();
      startWatchingLocation();
    }
  }, [latitude, longitude, fetchCurrentLocation, startWatchingLocation]);

  return null;
}
