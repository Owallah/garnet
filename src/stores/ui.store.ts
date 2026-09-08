"use client";

import { create } from "zustand";

type UIState = {
  mobileMenuOpen: boolean;
  activeModal: string | null;
  cookieConsent: "accepted" | "rejected" | null;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  setCookieConsent: (value: "accepted" | "rejected") => void;
};

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  activeModal: null,
  cookieConsent: null,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  setCookieConsent: (value) => set({ cookieConsent: value }),
}));
