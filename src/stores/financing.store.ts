"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { FinancingInput, FinancingStep } from "@/lib/validations/financing.schema";

type FinancingData = Partial<FinancingInput>;

type FinancingState = {
  currentStep: FinancingStep;
  furthestStep: FinancingStep;
  formData: FinancingData;
  setFormData: (data: FinancingData) => void;
  goToStep: (step: FinancingStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
};

const initial = { currentStep: 1 as FinancingStep, furthestStep: 1 as FinancingStep, formData: {} };

/**
 * Persisted so a part-completed enquiry survives a refresh. Consent is
 * deliberately stripped on rehydrate - it must be given in the session that
 * submits, not inherited from an earlier one.
 */
export const useFinancingStore = create<FinancingState>()(
  persist(
    (set) => ({
      ...initial,
      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      goToStep: (step) =>
        set((state) => ({ currentStep: Math.min(step, state.furthestStep) as FinancingStep })),
      nextStep: () =>
        set((state) => {
          const next = Math.min(state.currentStep + 1, 4) as FinancingStep;
          return {
            currentStep: next,
            furthestStep: Math.max(next, state.furthestStep) as FinancingStep,
          };
        }),
      previousStep: () =>
        set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) as FinancingStep })),
      reset: () => set(initial),
    }),
    {
      name: "garnet-financing",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ currentStep: state.currentStep, furthestStep: state.furthestStep, formData: state.formData }),
      onRehydrateStorage: () => (state) => {
        if (state?.formData) delete state.formData.consent;
      },
    },
  ),
);
