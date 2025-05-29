import { create } from 'zustand';

interface ParkingFilterStoreType {
  schedule?: {
    entryTime: string | null;
    exitTime?: string | null;
  };
  mapCenter?: {
    lat: number;
    lng: number;
    locationName: string | null;
  };
  mapBounds?: {
    maxlat: number | null;
    minlat: number | null;
    maxlng: number | null;
    minlng: number | null;
  };
  evcharge?: number;
  setSchedule: (entryTime: string | null, exitTime?: string | null) => void;
  setMapCenter: (lat: number, lng: number, loactionName: string | null) => void;
  setMapBounds: (
    maxlat: number | null,
    minlat: number | null,
    maxlng: number | null,
    minlng: number | null
  ) => void;

  setVehicle: (evcharge: number) => void;
}

export const useParkingFilterStore = create<ParkingFilterStoreType>((set) => ({
  schedule: {
    entryTime: '',

    exitTime: '',
  },
  location: {
    lat: 37.5727,
    lng: 126.9695,
    locationName: '',
  },
  mapBounds: { maxlat: null, minlat: null, maxlng: null, minlng: null },

  evcharge: 0,

  setSchedule: (entryTime, exitTime) => {
    set(() => ({
      schedule: {
        entryTime: entryTime,
        exitTime: exitTime,
      },
    }));
  },

  setMapCenter: (lat, lng, locationName) => {
    set(() => ({
      mapCenter: {
        lat,
        lng,
        locationName,
      },
    }));
  },

  setMapBounds: (maxlat, minlat, maxlng, minlng) => {
    set(() => ({
      mapBounds: {
        maxlat,
        minlat,
        maxlng,
        minlng,
      },
    }));
  },

  setVehicle: (evcharge) => {
    set(() => ({ evcharge }));
  },
}));
