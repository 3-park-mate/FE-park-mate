import { create } from 'zustand';

interface MapState {
  center: { lat: number | undefined; lng: number | undefined };
  level: number;
  setCenter: (coords: { lat: number; lng: number }) => void;
  setLevel: (level: number) => void;
}

interface MapModalState {
  isOpenSimpleModal: boolean;
  isOpenListModal: boolean;
  setIsOpenSimpleModal: (isOpen: boolean) => void;
  setIsOpenListModal: (isOpen: boolean) => void;
  clearSelection: () => void;
}

export const useMapStore = create<MapModalState & MapState>((set, get) => ({
  center: { lat: undefined, lng: undefined },
  level: 5,
  setCenter: (coords) => {
    set({ center: { lat: coords.lat, lng: coords.lng } });
  },
  setLevel: (level) => {
    set({ level: level });
  },
  isOpenListModal: false,
  isOpenSimpleModal: false,
  setIsOpenSimpleModal: (isOpen) => {
    set({ isOpenSimpleModal: isOpen });
  },

  setIsOpenListModal: (isOpen) => {
    set({ isOpenListModal: isOpen });
  },
  clearSelection: () => {
    if (get().isOpenSimpleModal) {
      set({ isOpenSimpleModal: false });
    }
    if (get().isOpenListModal) {
      set({ isOpenListModal: false });
    }
  },
}));
