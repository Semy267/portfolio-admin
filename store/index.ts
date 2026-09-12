import { create } from "zustand";

const initialDialog: IOverlay = {
  id: "",
};

const store = create<IRootStore>((set) => ({
  loading: false,
  setLoading: () => set({ loading: true }),
  clearLoading: () => set({ loading: false }),
  overlay: null,
  setOpenOverlay: (overlay: IOverlay) =>
    set({ overlay: { ...overlay, open: true } }),
  closeOverlay: () => set({ overlay: initialDialog }),
}));

export default store;
