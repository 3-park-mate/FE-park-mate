import { create } from 'zustand';

interface GnbNavBarStore {
  active: boolean;
  setGnbNavBar: (active: boolean) => void;
}

export const useGnbNavBarStore = create<GnbNavBarStore>((set) => ({
  active: true,
  setGnbNavBar: (active) => {
    set(() => ({
      active: active,
    }));
  },
}));
