import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
  RequirementCategory,
  EventType,
  EventBasicsFormData,
  ContactFormData,
} from '@gopratle/shared';

export interface EventState {
  eventName: string;
  eventType: EventType | '';
  isMultiDay: boolean;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
}

export interface ContactState {
  name: string;
  email: string;
  phone: string;
}

export interface RequirementStoreState {
  currentStep: number;
  idempotencyKey: string;
  event: EventState;
  category: RequirementCategory;
  categoryDetails: Record<string, any>;
  additionalDetails: Record<string, any>;
  contact: ContactState;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCategory: (category: RequirementCategory) => void;
  setEventBasics: (event: Partial<EventState>) => void;
  setCategoryDetails: (details: Record<string, any>) => void;
  setAdditionalDetails: (details: Record<string, any>) => void;
  setContact: (contact: Partial<ContactState>) => void;
  resetDraft: () => void;
  getSubmissionPayload: () => any;
}

const initialEventState: EventState = {
  eventName: '',
  eventType: '',
  isMultiDay: false,
  startDate: '',
  endDate: '',
  location: '',
  venue: '',
};

const initialContactState: ContactState = {
  name: '',
  email: '',
  phone: '',
};

export const useRequirementStore = create<RequirementStoreState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      idempotencyKey: uuidv4(),
      event: { ...initialEventState },
      category: 'planner',
      categoryDetails: {},
      additionalDetails: {},
      contact: { ...initialContactState },

      setStep: (step: number) => {
        if (step >= 1 && step <= 4) {
          set({ currentStep: step });
        }
      },

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 4) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      setCategory: (newCategory: RequirementCategory) => {
        const { category } = get();
        if (category !== newCategory) {
          // Rule: Changing a category clears incompatible category-specific fields,
          // but preserves common event and contact details.
          set({
            category: newCategory,
            categoryDetails: {},
            additionalDetails: {
              description: get().additionalDetails.description || '',
              specialRequirements: get().additionalDetails.specialRequirements || '',
            },
          });
        }
      },

      setEventBasics: (data: Partial<EventState>) => {
        set((state) => ({
          event: { ...state.event, ...data },
        }));
      },

      setCategoryDetails: (details: Record<string, any>) => {
        set((state) => ({
          categoryDetails: { ...state.categoryDetails, ...details },
        }));
      },

      setAdditionalDetails: (details: Record<string, any>) => {
        set((state) => ({
          additionalDetails: { ...state.additionalDetails, ...details },
        }));
      },

      setContact: (contact: Partial<ContactState>) => {
        set((state) => ({
          contact: { ...state.contact, ...contact },
        }));
      },

      resetDraft: () => {
        set({
          currentStep: 1,
          idempotencyKey: uuidv4(),
          event: { ...initialEventState },
          category: 'planner',
          categoryDetails: {},
          additionalDetails: {},
          contact: { ...initialContactState },
        });
      },

      getSubmissionPayload: () => {
        const state = get();
        return {
          category: state.category,
          event: {
            eventName: state.event.eventName.trim(),
            eventType: state.event.eventType,
            startDate: state.event.startDate,
            endDate: state.event.isMultiDay && state.event.endDate ? state.event.endDate : null,
            location: state.event.location.trim(),
            venue: state.event.venue.trim(),
          },
          categoryDetails: state.categoryDetails,
          additionalDetails: state.additionalDetails,
          contact: {
            name: state.contact.name.trim(),
            email: state.contact.email.trim().toLowerCase(),
            phone: state.contact.phone.trim(),
          },
        };
      },
    }),
    {
      name: 'gopratle_requirement_draft',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        idempotencyKey: state.idempotencyKey,
        event: state.event,
        category: state.category,
        categoryDetails: state.categoryDetails,
        additionalDetails: state.additionalDetails,
        contact: state.contact,
      }),
    }
  )
);

