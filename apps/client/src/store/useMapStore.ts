import { ScheduleType } from '@/types/initialDataTypes';
import { ParkingLotSimpleInfoType } from '@/types/mapDataTypes';
import { create } from 'zustand';

interface MapState {
  mapInfo: {
    center: { lat: number | null; lng: number | null };
    level: number | null;
  };
  filterInfo: {
    filterSchedule: ScheduleType | null;
    filterEv: boolean;
  };
  modalInfo: {
    simpleModal: ParkingLotSimpleInfoType | null;
    openListModal: boolean;
  };
  setCenter: (lat: number, lng: number) => void;
  setLevel: (level: number) => void;
  setClickMarker: (data: ParkingLotSimpleInfoType) => void;
  setFilterSchedule: (schedule: ScheduleType) => void;
  setFilterEv: (ev: boolean) => void;
}

export const useMapStore = create<MapState>((set, get) => ({
  mapInfo: {
    center: { lat: null, lng: null },
    level: null,
  },
  filterInfo: {
    filterSchedule: null,
    filterEv: false,
  },
  modalInfo: {
    simpleModal: null,
    openListModal: false,
  },
  setCenter: (lat, lng) =>
    set((state) => ({
      mapInfo: {
        ...state.mapInfo,
        center: { lat, lng },
      },
    })),
  setLevel: (level) =>
    set((state) => ({
      mapInfo: {
        ...state.mapInfo,
        level: level,
      },
    })),
  setClickMarker: (data) =>
    set((state) => ({
      mapInfo: {
        ...state.mapInfo,
        clickMarker: data,
      },
    })),
  setFilterSchedule: (schedule) =>
    set((state) => ({
      filterInfo: {
        ...state.filterInfo,
        filterSchedule: schedule,
      },
    })),
  setFilterEv: (ev) =>
    set((state) => ({
      filterInfo: {
        ...state.filterInfo,
        filterEv: ev,
      },
    })),
}));
