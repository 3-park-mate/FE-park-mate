import { create } from 'zustand';

interface MapState {
  center: { lat: number | undefined; lng: number | undefined };
  level: number;
  setCenter: (coords: {
    lat: number | undefined;
    lng: number | undefined;
  }) => void;
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
  level: 4,

  isOpenListModal: false,
  isOpenSimpleModal: false,

  setCenter: (coords) => {
    set({ center: { lat: coords.lat, lng: coords.lng } });
  },
  setLevel: (level) => {
    set({ level: level });
  },

  setIsOpenSimpleModal: (isOpen) => {
    const updates: Partial<MapModalState> = { isOpenSimpleModal: isOpen };
    if (isOpen && get().isOpenListModal) {
      updates.isOpenListModal = false;
    }
    set(updates);
  },

  setIsOpenListModal: (isOpen) => {
    const updates: Partial<MapModalState> = { isOpenListModal: isOpen };
    if (isOpen && get().isOpenSimpleModal) {
      updates.isOpenSimpleModal = false;
    }
    set(updates);
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
