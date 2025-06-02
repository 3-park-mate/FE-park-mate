import { create } from 'zustand';

interface GnbNavBarStore {
  active: boolean;
  setActive: (active: boolean) => void;
}

export const useGnbNavBarStore = create<GnbNavBarStore>((set) => ({
  active: true,
  setActive: (active) => {
    set(() => ({
      active: active,
    }));
  },
}));
