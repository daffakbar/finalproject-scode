import { create } from "zustand";

export const useStore = create((set) => ({
  active: 1,
  handleActive: (newActive) => set({ active: newActive }),
  editId: 0,
  handleGetEditId: (editId) => set({ editId: editId }),
}));
