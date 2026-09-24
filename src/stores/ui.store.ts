"use client";

import { create } from "zustand";

/**
 * Global UI state.
 *
 * Deliberately one concern. The store previously also carried `activeModal`
 * and `cookieConsent` with their setters, none of which any component read:
 * scaffolding written against a modal system and a consent banner that were
 * never built. Unused store fields are worse than absent ones, because the
 * next person to need a modal will wire into a slot that has no renderer
 * behind it and wonder why nothing appears. When a modal or a consent banner
 * is actually built, its state comes back with it.
 */
type UIState = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
