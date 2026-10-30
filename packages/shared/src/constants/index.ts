export const REQUIREMENT_CATEGORIES = ['planner', 'performer', 'crew'] as const;
export type RequirementCategory = (typeof REQUIREMENT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<RequirementCategory, string> = {
  planner: 'Event Planner',
  performer: 'Performer',
  crew: 'Crew',
};

export const CATEGORY_DESCRIPTIONS: Record<RequirementCategory, string> = {
  planner: 'For organizers looking for seasoned professionals to coordinate, style, and manage every event detail.',
  performer: 'For organizers looking for solo artists, live bands, DJs, comedians, and captivating entertainers.',
  crew: 'For organizers looking for operational, technical, backstage, and hospitality event support staff.',
};

export const EVENT_TYPES = [
  'wedding',
  'corporate-event',
  'birthday-party',
  'concert-music-festival',
  'college-university-event',
  'exhibition-trade-show',
  'cultural-event',
  'other',
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  wedding: 'Wedding',
  'corporate-event': 'Corporate Event',
  'birthday-party': 'Birthday / Private Party',
  'concert-music-festival': 'Concert / Music Festival',
  'college-university-event': 'College / University Event',
  'exhibition-trade-show': 'Exhibition / Trade Show',
  'cultural-event': 'Cultural Event',
  other: 'Other',
};

export const BUDGET_RANGES = [
  'under-50k',
  '50k-1lakh',
  '1lakh-3lakh',
  '3lakh-5lakh',
  '5lakh-10lakh',
  'above-10lakh',
  'flexible',
] as const;
export type BudgetRange = (typeof BUDGET_RANGES)[number];

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  'under-50k': 'Under ₹50,000',
  '50k-1lakh': '₹50,000 – ₹1,00,000',
  '1lakh-3lakh': '₹1,00,000 – ₹3,00,000',
  '3lakh-5lakh': '₹3,00,000 – ₹5,00,000',
  '5lakh-10lakh': '₹5,00,000 – ₹10,00,000',
  'above-10lakh': 'Above ₹10,00,000',
  flexible: 'Flexible / To Be Discussed',
};

// Planner Constants
export const PLANNER_SERVICES = [
  'complete-event-planning',
  'venue-selection',
  'decoration-styling',
  'catering-coordination',
  'entertainment-management',
  'logistics-vendor-management',
  'guest-management',
  'event-coordination',
] as const;
export type PlannerService = (typeof PLANNER_SERVICES)[number];

export const PLANNER_SERVICE_LABELS: Record<PlannerService, string> = {
  'complete-event-planning': 'Complete Event Planning',
  'venue-selection': 'Venue Selection',
  'decoration-styling': 'Decoration & Styling',
  'catering-coordination': 'Catering Coordination',
  'entertainment-management': 'Entertainment Management',
  'logistics-vendor-management': 'Logistics & Vendor Management',
  'guest-management': 'Guest Management',
  'event-coordination': 'Event Coordination',
};

export const PLANNING_SCOPES = [
  'full-planning',
  'partial-planning',
  'day-of-coordination',
] as const;
export type PlanningScope = (typeof PLANNING_SCOPES)[number];

export const PLANNING_SCOPE_LABELS: Record<PlanningScope, string> = {
  'full-planning': 'Full Planning',
  'partial-planning': 'Partial Planning',
  'day-of-coordination': 'Day-of Coordination',
};

// Performer Constants
export const PERFORMER_CATEGORIES = [
  'singer-vocalist',
  'dj',
  'live-band',
  'instrumentalist',
  'dancer-dance-group',
  'comedian',
  'magician',
  'anchor-host',
  'celebrity-appearance',
  'other',
] as const;
export type PerformerCategory = (typeof PERFORMER_CATEGORIES)[number];

export const PERFORMER_CATEGORY_LABELS: Record<PerformerCategory, string> = {
  'singer-vocalist': 'Singer / Vocalist',
  dj: 'DJ',
  'live-band': 'Live Band',
  instrumentalist: 'Instrumentalist',
  'dancer-dance-group': 'Dancer / Dance Group',
  comedian: 'Comedian',
  magician: 'Magician',
  'anchor-host': 'Anchor / Host',
  'celebrity-appearance': 'Celebrity Appearance',
  other: 'Other',
};

export const PERFORMANCE_TYPES = [
  'solo',
  'group',
  'live-performance',
  'recorded-dj-set',
  'flexible',
] as const;
export type PerformanceType = (typeof PERFORMANCE_TYPES)[number];

export const PERFORMANCE_TYPE_LABELS: Record<PerformanceType, string> = {
  solo: 'Solo',
  group: 'Group',
  'live-performance': 'Live Performance',
  'recorded-dj-set': 'Recorded / DJ Set',
  flexible: 'Flexible',
};

export const PERFORMANCE_DURATIONS = [
  'under-30-mins',
  '30-60-mins',
  '1-2-hours',
  '2-4-hours',
  'full-event',
  'to-be-discussed',
] as const;
export type PerformanceDuration = (typeof PERFORMANCE_DURATIONS)[number];

export const PERFORMANCE_DURATION_LABELS: Record<PerformanceDuration, string> = {
  'under-30-mins': 'Under 30 minutes',
  '30-60-mins': '30–60 minutes',
  '1-2-hours': '1–2 hours',
  '2-4-hours': '2–4 hours',
  'full-event': 'Full event',
  'to-be-discussed': 'To Be Discussed',
};

// Crew Constants
export const CREW_ROLES = [
  'event-manager',
  'production-manager',
  'stage-manager',
  'sound-engineer',
  'lighting-technician',
  'camera-operator',
  'photographer',
  'videographer',
  'security-staff',
  'hospitality-staff',
  'setup-logistics',
  'runner-assistant',
  'other',
] as const;
export type CrewRole = (typeof CREW_ROLES)[number];

export const CREW_ROLE_LABELS: Record<CrewRole, string> = {
  'event-manager': 'Event Manager',
  'production-manager': 'Production Manager',
  'stage-manager': 'Stage Manager',
  'sound-engineer': 'Sound Engineer',
  'lighting-technician': 'Lighting Technician',
  'camera-operator': 'Camera Operator',
  photographer: 'Photographer',
  videographer: 'Videographer',
  'security-staff': 'Security Staff',
  'hospitality-staff': 'Hospitality Staff',
  'setup-logistics': 'Setup / Logistics Team',
  'runner-assistant': 'Runner / General Assistant',
  other: 'Other',
};

export const SHIFT_DURATIONS = [
  'under-4-hours',
  '4-8-hours',
  '8-12-hours',
  'full-day',
  'multiple-days',
] as const;
export type ShiftDuration = (typeof SHIFT_DURATIONS)[number];

export const SHIFT_DURATION_LABELS: Record<ShiftDuration, string> = {
  'under-4-hours': 'Under 4 hours',
  '4-8-hours': '4–8 hours',
  '8-12-hours': '8–12 hours',
  'full-day': 'Full day',
  'multiple-days': 'Multiple days',
};

export const CREW_EXPERIENCES = [
  'entry-level',
  '1-2-years',
  '3-5-years',
  '5-plus-years',
  'not-mandatory',
] as const;
export type CrewExperience = (typeof CREW_EXPERIENCES)[number];

export const CREW_EXPERIENCE_LABELS: Record<CrewExperience, string> = {
  'entry-level': 'Entry Level',
  '1-2-years': '1–2 Years',
  '3-5-years': '3–5 Years',
  '5-plus-years': '5+ Years',
  'not-mandatory': 'Experience Not Mandatory',
};

export const VENUE_ENVIRONMENTS = ['indoor', 'outdoor', 'flexible'] as const;
export type VenueEnvironment = (typeof VENUE_ENVIRONMENTS)[number];

export const VENUE_ENVIRONMENT_LABELS: Record<VenueEnvironment, string> = {
  indoor: 'Indoor',
  outdoor: 'Outdoor',
  flexible: 'Flexible / Both',
};

export const REQUIREMENT_STATUSES = ['submitted', 'in-review', 'matched', 'completed', 'cancelled'] as const;
export type RequirementStatus = (typeof REQUIREMENT_STATUSES)[number];

