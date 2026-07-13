import { create } from "zustand";

interface FilterPanelState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useFilterPanelStore = create<FilterPanelState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));