import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRequirementStore } from '../store/requirement-store';
import { RequirementWizard } from '../components/requirements/RequirementWizard';
import { getTodayDateString } from '@gopratle/shared';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock api-client
vi.mock('@/lib/api-client', () => ({
  submitRequirement: vi.fn(),
  fetchRequirement: vi.fn(),
  ApiClientError: class ApiClientError extends Error {
    constructor(public statusCode: number, message: string) {
      super(message);
    }
  },
}));

describe('Requirement Wizard Frontend Tests', () => {
  beforeEach(() => {
    mockPush.mockReset();
    useRequirementStore.getState().resetDraft();
  });

  // 1. Step 1 validates required fields
  it('1. Step 1 validates required fields on submit without input', async () => {
    render(<RequirementWizard />);

    // Click Continue without filling anything
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(continueBtn);

    await waitFor(() => {
      expect(screen.getByText(/Event name must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Please select a valid event type/i)).toBeInTheDocument();
      expect(screen.getByText(/City \/ Location must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  // 2. Selecting planner shows planner fields
  it('2. Selecting planner shows planner fields in Step 2', async () => {
    const store = useRequirementStore.getState();
    store.setCategory('planner');
    store.setStep(2);

    render(<RequirementWizard />);

    expect(screen.getByText(/Planning Services Required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expected Guest Count/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Planning Scope/i)).toBeInTheDocument();
  });

  // 3. Selecting performer shows performer fields
  it('3. Selecting performer shows performer fields in Step 2', async () => {
    const store = useRequirementStore.getState();
    store.setCategory('performer');
    store.setStep(2);

    render(<RequirementWizard />);

    expect(screen.getByLabelText(/Performer Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Performance Style/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Artists/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Performance Duration/i)).toBeInTheDocument();
  });

  // 4. Selecting crew shows crew fields
  it('4. Selecting crew shows crew fields in Step 2', async () => {
    const store = useRequirementStore.getState();
    store.setCategory('crew');
    store.setStep(2);

    render(<RequirementWizard />);

    expect(screen.getByText(/Crew Roles Needed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Crew Members/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Shift Duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Required Experience/i)).toBeInTheDocument();
  });

  // 5. Changing steps preserves values
  it('5. Changing steps preserves entered values', async () => {
    const store = useRequirementStore.getState();
    store.setEventBasics({
      eventName: 'Grand Gala 2027',
      location: 'Jaipur',
    });
    store.setStep(1);

    const { rerender } = render(<RequirementWizard />);
    expect(screen.getByDisplayValue('Grand Gala 2027')).toBeInTheDocument();

    // Advance to step 2 and go back to step 1
    store.setStep(2);
    rerender(<RequirementWizard />);

    store.setStep(1);
    rerender(<RequirementWizard />);

    expect(screen.getByDisplayValue('Grand Gala 2027')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jaipur')).toBeInTheDocument();
  });

  // 6. Changing category resets incompatible fields
  it('6. Changing category resets incompatible category fields but preserves event info', () => {
    const store = useRequirementStore.getState();
    store.setEventBasics({
      eventName: 'Summer Music Fest',
      location: 'Goa',
    });
    store.setCategory('planner');
    store.setCategoryDetails({
      services: ['complete-event-planning'],
      guestCount: 500,
    });

    // Change to performer
    store.setCategory('performer');

    const state = useRequirementStore.getState();
    expect(state.category).toBe('performer');
    // Incompatible planner fields are cleared
    expect(state.categoryDetails.services).toBeUndefined();
    expect(state.categoryDetails.guestCount).toBeUndefined();
    // Common event details are preserved
    expect(state.event.eventName).toBe('Summer Music Fest');
    expect(state.event.location).toBe('Goa');
  });

  // 7. Review screen displays the correct data
  it('7. Review screen displays the complete structured summary', async () => {
    const store = useRequirementStore.getState();
    store.setEventBasics({
      eventName: 'Design Conclave 2027',
      eventType: 'corporate-event',
      startDate: getTodayDateString(),
      location: 'Delhi',
      venue: 'Pragati Maidan',
    });
    store.setCategory('performer');
    store.setCategoryDetails({
      performerCategory: 'dj',
      performanceType: 'live-performance',
      performerCount: 2,
      duration: '1-2-hours',
      budget: '1lakh-3lakh',
    });
    store.setContact({
      name: 'Rohan Sharma',
      email: 'rohan@example.com',
      phone: '9876543210',
    });
    store.setStep(4);

    render(<RequirementWizard />);

    expect(screen.getByText('Design Conclave 2027')).toBeInTheDocument();
    expect(screen.getByText('Pragati Maidan')).toBeInTheDocument();
    expect(screen.getByText('Rohan Sharma')).toBeInTheDocument();
    expect(screen.getByText('rohan@example.com')).toBeInTheDocument();
    expect(screen.getByText('9876543210')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Requirement/i })).toBeInTheDocument();
  });

  // 8. Successful submission redirects to confirmation
  it('8. Successful submission resets draft and redirects to confirmation', async () => {
    const { submitRequirement } = await import('@/lib/api-client');
    (submitRequirement as any).mockResolvedValueOnce({
      reference: 'GPR-1A2B3C4D',
      category: 'planner',
      status: 'submitted',
      createdAt: new Date().toISOString(),
    });

    const store = useRequirementStore.getState();
    store.setEventBasics({
      eventName: 'Tech Meetup 2027',
      eventType: 'corporate-event',
      startDate: getTodayDateString(),
      location: 'Pune',
    });
    store.setCategory('planner');
    store.setCategoryDetails({
      services: ['complete-event-planning'],
      guestCount: 100,
      budget: '50k-1lakh',
      planningScope: 'full-planning',
    });
    store.setContact({
      name: 'Priya Mehta',
      email: 'priya@example.com',
      phone: '9876543210',
    });
    store.setStep(4);

    render(<RequirementWizard />);

    const submitBtn = screen.getByRole('button', { name: /Submit Requirement/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitRequirement).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/requirements/success/GPR-1A2B3C4D');
    });
  });

  // 9. API failure preserves the draft
  it('9. API failure preserves the draft and displays error message', async () => {
    const { submitRequirement, ApiClientError } = await import('@/lib/api-client');
    (submitRequirement as any).mockRejectedValueOnce(
      new ApiClientError(500, 'Server temporarily unavailable')
    );

    const store = useRequirementStore.getState();
    store.setEventBasics({
      eventName: 'Preserved Draft Event',
      eventType: 'wedding',
      startDate: getTodayDateString(),
      location: 'Jaipur',
    });
    store.setCategory('planner');
    store.setCategoryDetails({
      services: ['complete-event-planning'],
      guestCount: 200,
      budget: '3lakh-5lakh',
      planningScope: 'full-planning',
    });
    store.setContact({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
    });
    store.setStep(4);

    render(<RequirementWizard />);

    const submitBtn = screen.getByRole('button', { name: /Submit Requirement/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Submission failed/i)).toBeInTheDocument();
      expect(screen.getByText(/Server temporarily unavailable/i)).toBeInTheDocument();
    });

    // Form data is NOT lost
    const currentState = useRequirementStore.getState();
    expect(currentState.event.eventName).toBe('Preserved Draft Event');
    expect(currentState.contact.name).toBe('John Doe');
  });
});

