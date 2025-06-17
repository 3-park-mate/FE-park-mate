import { create } from 'zustand';

interface LocationAlertStore {
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
}

export const useLocationAlertStore = create<LocationAlertStore>((set) => ({
  openAlert: false,
  setOpenAlert: (openAlert) => set({ openAlert }),
}));
