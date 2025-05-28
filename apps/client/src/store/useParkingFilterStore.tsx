import { create } from 'zustand';

interface ParkingFilterStoreType {
  schedule?: {
    entryTime: string | null;
    exitTime?: string | null;
  };
  location?: {
    lat: number | null;
    lng: number | null;
    locationName: string | null;
  };
  evcharge?: number;
  setSchedule: (entryTime: string | null, exitTime?: string | null) => void;
  setLocation: (
    lat: number | null,
    lng: number | null,
    loactionName: string | null
  ) => void;
  setVehicle: (evcharge: number) => void;
}

export const useParkingFilterStore = create<ParkingFilterStoreType>((set) => ({
  schedule: {
    entryTime: '',

    exitTime: '',
  },
  location: {
    lat: null,
    lng: null,
    locationName: '',
  },
  evcharge: 0,

  setSchedule: (entryTime, exitTime) => {
    set(() => ({
      schedule: {
        entryTime: entryTime,
        exitTime: exitTime,
      },
    }));
  },

  setLocation: (lat, lng, locationName) => {
    set(() => ({
      location: {
        lat,
        lng,
        locationName,
      },
    }));
  },

  setVehicle: (evcharge) => {
    set(() => ({ evcharge }));
  },
}));
