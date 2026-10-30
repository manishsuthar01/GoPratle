# GoPratle — Requirement Management Platform
## Full-Stack Developer Intern Assignment | Complete Implementation Specification

---

# 1. Project Objective

Build a polished, responsive requirement-posting platform where users can submit requirements for an event by selecting one of three service categories:

1. Event Planner
2. Performer
3. Crew

The application should provide a guided, multi-step experience that dynamically adapts its questions according to the selected category.

The submitted requirements must be validated, persisted in MongoDB, and categorized correctly on the backend.

### Engineering objective

This is not just a form submission application.

The implementation should demonstrate:

- Component-driven frontend architecture.
- Separation of frontend and backend responsibilities.
- Modular backend architecture.
- Strong request validation and data integrity.
- Dynamic, schema-driven form experiences.
- REST API design.
- MongoDB schema design and indexing.
- Idempotent submission handling.
- Consistent error handling.
- Responsive and accessible UI.
- Maintainable, extensible code.
- Testing of important business flows.

The result should look and behave like a small, professionally built SaaS product.

---

# 2. Product Concept and User Experience

### Product name

GoPratle — Event Requirement Studio

### Product positioning

A streamlined platform that helps event organizers describe exactly what they need and connect their requirements with the right professionals.

### Core user journey

1. User opens the requirement creation page.
2. User enters basic event information.
3. User selects a requirement category.
4. Application dynamically displays relevant questions.
5. User completes category-specific information.
6. User reviews the complete requirement.
7. User submits the requirement.
8. Backend validates and stores the data.
9. User receives a clear confirmation with a unique requirement reference.

### Application routes

- `/` — Landing page.
- `/requirements/new` — Multi-step requirement creation.
- `/requirements/success/[reference]` — Submission confirmation.

Do not build authentication, payment processing, dashboards, or unrelated functionality. The assignment is focused on the requirement-posting workflow.

---

# 3. Technology Stack

Use TypeScript across the entire application.

## Frontend

| Technology | Responsibility |
|---|---|
| Next.js (App Router) | Application framework |
| React | UI components |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | Accessible UI primitives |
| React Hook Form | Form state management |
| Zod | Client-side validation |
| Zustand | Multi-step form state |
| Lucide React | Icons |
| Sonner | Toast notifications |

### Frontend principles

- Use reusable components instead of large page components.
- Keep business logic separate from presentation.
- Avoid unnecessary client components.
- Use Server Components for static page content.
- Use Client Components for interactive form experiences.
- Preserve form progress when users navigate between steps.
- Never lose entered information when changing steps.
- Use a centralized API client.

## Backend

| Technology | Responsibility |
|---|---|
| Node.js | Runtime |
| Express.js | HTTP framework |
| TypeScript | Type safety |
| MongoDB Atlas | Database |
| Mongoose | ODM and persistence |
| Zod | Request validation |
| Helmet | Security headers |
| CORS | Cross-origin configuration |
| express-rate-limit | Request rate limiting |
| Pino | Structured logging |
| UUID | Idempotency and request identifiers |
| Vitest | Unit and integration testing |
| Supertest | HTTP API testing |

## Infrastructure

| Technology | Responsibility |
|---|---|
| Vercel | Frontend deployment |
| Render or Railway | Backend deployment |
| MongoDB Atlas | Managed database |
| GitHub | Version control |
| GitHub Actions | Automated CI checks |

Use current stable, mutually compatible package versions. Avoid experimental dependencies unless there is a clear reason.

---

# 4. Repository Architecture

Use a monorepo with separate frontend, backend, and shared validation packages.

Package manager: pnpm.

Repository structure:

    gopratle/
    │
    ├── apps/
    │   ├── web/
    │   │   ├── app/
    │   │   │   ├── page.tsx
    │   │   │   ├── requirements/
    │   │   │   │   ├── new/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   └── success/
    │   │   │   │       └── [reference]/
    │   │   │   │           └── page.tsx
    │   │   │   ├── layout.tsx
    │   │   │   └── globals.css
    │   │   │
    │   │   ├── components/
    │   │   │   ├── ui/
    │   │   │   ├── layout/
    │   │   │   ├── landing/
    │   │   │   ├── requirements/
    │   │   │   │   ├── RequirementWizard.tsx
    │   │   │   │   ├── WizardHeader.tsx
    │   │   │   │   ├── WizardProgress.tsx
    │   │   │   │   ├── StepEventBasics.tsx
    │   │   │   │   ├── StepCategoryDetails.tsx
    │   │   │   │   ├── StepAdditionalDetails.tsx
    │   │   │   │   ├── StepReview.tsx
    │   │   │   │   ├── CategorySelector.tsx
    │   │   │   │   └── FormNavigation.tsx
    │   │   │
    │   │   ├── hooks/
    │   │   ├── lib/
    │   │   │   ├── api-client.ts
    │   │   │   └── utils.ts
    │   │   │
    │   │   ├── store/
    │   │   │   └── requirement-store.ts
    │   │   │
    │   │   ├── types/
    │   │   └── public/
    │   │
    │   └── api/
    │       ├── src/
    │       │   ├── config/
    │       │   │   ├── database.ts
    │       │   │   └── env.ts
    │       │   │
    │       │   ├── modules/
    │       │   │   └── requirements/
    │       │   │       ├── requirement.model.ts
    │       │   │       ├── requirement.routes.ts
    │       │   │       ├── requirement.controller.ts
    │       │   │       ├── requirement.service.ts
    │       │   │       ├── requirement.repository.ts
    │       │   │       ├── requirement.validation.ts
    │       │   │       └── requirement.types.ts
    │       │   │
    │       │   ├── middleware/
    │       │   │   ├── error-handler.ts
    │       │   │   ├── validate-request.ts
    │       │   │   ├── rate-limiter.ts
    │       │   │   └── request-logger.ts
    │       │   │
    │       │   ├── utils/
    │       │   │   ├── ApiError.ts
    │       │   │   └── ApiResponse.ts
    │       │   │
    │       │   ├── app.ts
    │       │   └── server.ts
    │       │
    │       └── tests/
    │
    ├── packages/
    │   └── shared/
    │       └── src/
    │           ├── schemas/
    │           │   └── requirement.schema.ts
    │           ├── constants/
    │           └── types/
    │
    ├── .github/
    │   └── workflows/
    │       └── ci.yml
    │
    ├── package.json
    ├── pnpm-workspace.yaml
    ├── tsconfig.base.json
    ├── .gitignore
    └── README.md

### Architectural rule

The frontend must never access MongoDB directly.

The frontend communicates with Express through HTTP APIs.

The Express application owns business rules, validation, persistence, and response formatting.

The shared package contains reusable validation schemas and types that are genuinely common to both applications.

Do not import backend models or database logic into the frontend.

---

# 5. Application UI and Design Direction

The interface should feel like a modern event-tech SaaS product, not a generic college assignment.

### Visual direction

Use an editorial, premium SaaS aesthetic.

- Background: warm off-white or very light neutral.
- Primary: deep navy or near-black.
- Accent: vibrant violet or electric blue.
- Cards: white with subtle borders.
- Typography: clean sans-serif with strong hierarchy.
- Rounded corners: 12–16px.
- Subtle shadows.
- Smooth, restrained transitions.
- Clear form labels and helper text.
- Strong visual distinction between selected and unselected options.

Avoid excessive gradients, glassmorphism, decorative animations, and unnecessary visual clutter.

### Landing page

Build a focused landing page containing:

1. A simple navigation header with GoPratle branding.
2. A strong hero heading:
   "Bring Your Event to Life."
3. Supporting text explaining the requirement-posting process.
4. A prominent CTA: "Create a Requirement".
5. Three category cards:
   - Event Planner
   - Performer
   - Crew
6. A simple three-step explanation:
   - Describe your event.
   - Tell us what you need.
   - Submit your requirement.
7. A minimal footer.

The CTA navigates to `/requirements/new`.

### Requirement creation page

Use a centered form container with:

- Progress indicator.
- Current step title.
- Short contextual description.
- Form content.
- Back and Continue controls.
- Save/progress feedback where appropriate.

Keep the form width approximately 720–850px on desktop.

On mobile, use a single-column layout with appropriately sized controls.

---

# 6. Multi-Step Requirement Flow

Implement four logical steps.

The category selection happens in Step 1, and Steps 2 and 3 adapt according to the selected category.

Step 4 is a complete review and submission screen.

## STEP 1 — Event Basics

Title: "Let's start with your event."

Description: "Tell us a little about the event so we can understand your requirements."

### Fields

| Field | Type | Required |
|---|---|---|
| Event name | Text input | Yes |
| Event type | Select | Yes |
| Event date | Date picker | Yes |
| Event end date | Date picker | Conditional |
| Location / City | Text input | Yes |
| Venue name | Text input | No |
| Requirement category | Selection cards | Yes |

### Event type options

- Wedding
- Corporate Event
- Birthday / Private Party
- Concert / Music Festival
- College / University Event
- Exhibition / Trade Show
- Cultural Event
- Other

### Date handling

Provide an event duration selection:

- Single-day event
- Multi-day event

For a single-day event, show one date.

For a multi-day event, show start and end dates.

Validation:

- Event date cannot be in the past.
- End date must be equal to or later than the start date.
- Store dates in a consistent ISO-compatible format.
- Preserve the date-only meaning of event dates. Do not accidentally shift dates through browser timezone conversion.

### Requirement category

Present three visually distinct selection cards.

**Event Planner**

For users looking for professionals to organize and manage an event.

**Performer**

For users looking for artists, musicians, DJs, entertainers, and other performers.

**Crew**

For users looking for operational and technical event staff.

Only one category can be selected.

The selected category determines the form fields in Steps 2 and 3.

---

## STEP 2 — Category-Specific Primary Requirements

Title should dynamically adapt:

- Planner: "Tell us what you need planned."
- Performer: "What kind of performance are you looking for?"
- Crew: "What kind of crew do you need?"

### A. Event Planner fields

| Field | Type | Required |
|---|---|---|
| Planning services | Multi-select | Yes |
| Expected guest count | Number input | Yes |
| Event budget | Select / range | Yes |
| Planning scope | Select | Yes |

Planning services:

- Complete Event Planning
- Venue Selection
- Decoration & Styling
- Catering Coordination
- Entertainment Management
- Logistics & Vendor Management
- Guest Management
- Event Coordination

Planning scope:

- Full Planning
- Partial Planning
- Day-of Coordination

Guest count must be a positive integer.

Budget options:

- Under ₹50,000
- ₹50,000–₹1,00,000
- ₹1,00,000–₹3,00,000
- ₹3,00,000–₹5,00,000
- ₹5,00,000–₹10,00,000
- Above ₹10,00,000
- Flexible / To Be Discussed

### B. Performer fields

| Field | Type | Required |
|---|---|---|
| Performer category | Select | Yes |
| Performance type | Select | Yes |
| Number of performers | Number input | Yes |
| Performance duration | Select | Yes |
| Budget | Select | Yes |

Performer categories:

- Singer / Vocalist
- DJ
- Live Band
- Instrumentalist
- Dancer / Dance Group
- Comedian
- Magician
- Anchor / Host
- Celebrity Appearance
- Other

Performance type:

- Solo
- Group
- Live Performance
- Recorded / DJ Set
- Flexible

Duration:

- Under 30 minutes
- 30–60 minutes
- 1–2 hours
- 2–4 hours
- Full event
- To Be Discussed

Use the same budget ranges as the planner category.

### C. Crew fields

| Field | Type | Required |
|---|---|---|
| Crew roles | Multi-select | Yes |
| Number of crew members | Number input | Yes |
| Shift duration | Select | Yes |
| Required experience | Select | Yes |
| Budget | Select | Yes |

Crew roles:

- Event Manager
- Production Manager
- Stage Manager
- Sound Engineer
- Lighting Technician
- Camera Operator
- Photographer
- Videographer
- Security Staff
- Hospitality Staff
- Setup / Logistics Team
- Runner / General Assistant
- Other

Shift duration:

- Under 4 hours
- 4–8 hours
- 8–12 hours
- Full day
- Multiple days

Experience:

- Entry Level
- 1–2 Years
- 3–5 Years
- 5+ Years
- Experience Not Mandatory

Use the same budget ranges.

---

## STEP 3 — Additional Requirements

Title:

"Let's add the final details."

This step should also adapt according to the category.

### Common fields

| Field | Type | Required |
|---|---|---|
| Additional description | Textarea | No |
| Special requirements | Textarea | No |
| Contact person name | Text input | Yes |
| Contact email | Email input | Yes |
| Contact phone | Phone input | Yes |

### Planner-specific additional fields

- Preferred event theme/style.
- Preferred communication or coordination notes.
- Special planning constraints.

### Performer-specific additional fields

- Preferred music genre or performance style.
- Language preferences.
- Technical equipment requirements.
- Indoor / outdoor preference.

### Crew-specific additional fields

- Required equipment or tools.
- Uniform / dress code requirements.
- Reporting instructions.
- On-site experience or certification requirements.

Use optional fields where appropriate.

Keep the interface manageable. Do not overwhelm the user with too many questions at once.

For optional multi-select fields, allow users to select multiple options.

---

## STEP 4 — Review and Submit

Title: "Review your requirement."

Show a structured summary divided into sections:

1. Event Information.
2. Selected Category.
3. Primary Requirements.
4. Additional Requirements.
5. Contact Information.

Each section should have an Edit button.

Clicking Edit should take the user directly to the relevant step without losing other entered information.

### Submission interaction

Submit button:

"Submit Requirement"

During submission:

- Disable duplicate clicks.
- Show a loading state.
- Preserve the complete form data.
- Send the payload to the backend.
- Handle validation errors.
- Handle server errors.
- Handle network failures.
- Never clear the form before receiving a successful response.

On success, redirect to:

`/requirements/success/[reference]`

### Success screen

Show:

- Success indicator.
- "Your requirement has been submitted."
- Unique requirement reference.
- Selected category.
- Event name.
- Confirmation message.
- Button to return to the homepage.
- Button to create another requirement.

---

# 7. Dynamic Form Architecture

Do not implement three separate, duplicated wizard implementations.

Use one reusable wizard with category-specific configuration.

Suggested conceptual structure:

    RequirementWizard
        |
        |-- StepEventBasics
        |
        |-- StepCategoryDetails
        |       |
        |       |-- PlannerFields
        |       |-- PerformerFields
        |       |-- CrewFields
        |
        |-- StepAdditionalDetails
        |       |
        |       |-- PlannerAdditionalFields
        |       |-- PerformerAdditionalFields
        |       |-- CrewAdditionalFields
        |
        |-- StepReview

### Form state

Use Zustand to maintain a single requirement draft.

Example conceptual structure:

    {
      currentStep: 1,

      event: {
        eventName: "",
        eventType: "",
        startDate: "",
        endDate: "",
        location: "",
        venue: ""
      },

      category: "planner",

      categoryDetails: {},

      additionalDetails: {},

      contact: {
        name: "",
        email: "",
        phone: ""
      }
    }

Use a discriminated union for category-specific data rather than an untyped collection of arbitrary fields.

### Important behavior

- Changing the current step must not erase previously entered values.
- Changing a category must clear incompatible category-specific fields.
- Preserve common event and contact details when changing categories.
- The review screen must display the exact information that will be submitted.
- Validate fields before advancing to the next step.
- Validate the entire payload again before submission.

Use React Hook Form for individual step validation and integrate it with the central draft store.

Do not introduce unnecessary synchronization between multiple competing form states. Keep a clear source of truth.

Persist draft progress in sessionStorage or localStorage if useful, but only store the draft, never secrets. Clear the persisted draft after successful submission.

---

# 8. Backend Architecture

Use a modular monolith architecture.

The assignment does not require microservices.

A modular monolith provides clear separation of responsibilities while keeping deployment and maintenance simple.

### Request lifecycle

    Frontend
       |
       | POST /api/v1/requirements
       |
       v
    Express Router
       |
       v
    Request Validation Middleware
       |
       v
    Controller
       |
       v
    Requirement Service
       |
       v
    Requirement Repository
       |
       v
    MongoDB
       |
       v
    Standardized API Response
       |
       v
    Frontend Confirmation

### Layer responsibilities

**Routes**

- Define API endpoints.
- Apply relevant middleware.
- Delegate to controllers.

**Validation**

- Validate request structure.
- Validate category-specific fields.
- Reject invalid or unexpected data.
- Prevent malformed requests from reaching the business layer.

**Controller**

- Extract validated request information.
- Invoke service methods.
- Return HTTP responses.

**Service**

- Contain business logic.
- Enforce category rules.
- Generate requirement references.
- Coordinate persistence.
- Implement idempotency behavior.

**Repository**

- Encapsulate database operations.
- Handle document creation and retrieval.
- Keep Mongoose-specific queries outside the service layer.

**Model**

- Define the MongoDB schema.
- Define indexes.
- Enforce persistence-level constraints.

Do not place all business logic inside Express route handlers.

---

# 9. MongoDB Data Model

Use one primary collection:

`requirements`

All three categories should be stored in the same collection.

Reason: all requirements share common event information and submission behavior, while category-specific information differs.

This allows efficient querying, consistent lifecycle management, and simpler future filtering.

### Document structure

    {
      "_id": "ObjectId",

      "reference": "GPR-XXXXXXXX",

      "category": "planner",

      "status": "submitted",

      "event": {
        "eventName": "Annual Tech Conference",
        "eventType": "corporate",
        "startDate": "2027-02-15",
        "endDate": null,
        "location": "Jaipur",
        "venue": "Convention Centre"
      },

      "categoryDetails": {
        // Category-specific structured information
      },

      "additionalDetails": {
        "description": "",
        "specialRequirements": ""
      },

      "contact": {
        "name": "Example User",
        "email": "example@example.com",
        "phone": "9876543210"
      },

      "createdAt": "Date",
      "updatedAt": "Date"
    }

The above is an illustrative structure. Implement actual category-specific types and fields rather than accepting arbitrary objects.

### Category-specific persistence

For planner:

    category: "planner"

    categoryDetails: {
      services: [],
      guestCount: 300,
      budget: "1-3-lakh",
      planningScope: "full-planning"
    }

For performer:

    category: "performer"

    categoryDetails: {
      performerCategory: "dj",
      performanceType: "live-performance",
      performerCount: 2,
      duration: "1-2-hours",
      budget: "1-3-lakh"
    }

For crew:

    category: "crew"

    categoryDetails: {
      roles: ["sound-engineer", "lighting-technician"],
      crewCount: 5,
      shiftDuration: "8-12-hours",
      experience: "1-2-years",
      budget: "under-50000"
    }

The database must never store fields from another category accidentally.

### MongoDB indexes

Implement:

1. Unique index on `reference`.
2. Compound index on `category` and `createdAt`.
3. Index on `status` and `createdAt`.

Example:

    { reference: 1 } unique
    { category: 1, createdAt: -1 }
    { status: 1, createdAt: -1 }

These indexes support unique references and future administrative filtering.

Do not create excessive indexes without query requirements.

### Mongoose schema

Use:

- Required fields.
- Enumerations for categories and statuses.
- Timestamps.
- Strict schema mode.
- Category-aware validation.
- Appropriate nested schemas.

Use a category discriminator or an equivalent strongly typed category-specific validation strategy.

---

# 10. REST API Design

Base URL:

`/api/v1`

### Endpoint 1: Health check

`GET /api/v1/health`

Response:

    {
      "success": true,
      "message": "API is healthy",
      "data": {
        "status": "ok"
      }
    }

### Endpoint 2: Create requirement

`POST /api/v1/requirements`

Headers:

    Content-Type: application/json
    Idempotency-Key: <unique-client-generated-key>

Request example:

    {
      "category": "planner",

      "event": {
        "eventName": "Annual Tech Conference",
        "eventType": "corporate",
        "startDate": "2027-02-15",
        "endDate": null,
        "location": "Jaipur",
        "venue": "Convention Centre"
      },

      "categoryDetails": {
        "services": [
          "complete-planning",
          "decoration"
        ],
        "guestCount": 300,
        "budget": "1-3-lakh",
        "planningScope": "full-planning"
      },

      "additionalDetails": {
        "description": "A technology conference.",
        "specialRequirements": ""
      },

      "contact": {
        "name": "Example User",
        "email": "example@example.com",
        "phone": "9876543210"
      }
    }

Successful response:

HTTP 201

    {
      "success": true,
      "message": "Requirement submitted successfully",
      "data": {
        "reference": "GPR-A81F92C4",
        "category": "planner",
        "status": "submitted",
        "createdAt": "2027-01-01T10:00:00.000Z"
      }
    }

### Endpoint 3: Retrieve requirement

`GET /api/v1/requirements/:reference`

Return a safe representation of the submitted requirement.

Do not expose unnecessary contact information in a public endpoint.

For this assignment, either restrict this endpoint to an appropriate safe response or omit it if the frontend only needs the submission confirmation returned by the create endpoint.

### Endpoint 4: List requirements

`GET /api/v1/requirements`

Support:

- Category filtering.
- Status filtering.
- Pagination.

Example:

`GET /api/v1/requirements?category=planner&page=1&limit=10`

This endpoint is useful for demonstrating backend query design and future administrative extensibility. Do not build a public dashboard around it.

---

# 11. Idempotency and Reliable Submission

This is an important engineering detail.

Users may accidentally click Submit multiple times, refresh the page, or experience network failures after the server has already saved their requirement.

Implement idempotent submission handling.

### Expected behavior

The frontend generates a UUID for a submission attempt and sends it through:

`Idempotency-Key`

The backend maintains an idempotency record or an equivalent durable mechanism.

For the assignment, implement a separate `idempotency_records` collection.

Suggested structure:

    {
      key: "client-generated-uuid",
      requestHash: "sha256-hash",
      response: {
        reference: "GPR-A81F92C4",
        category: "planner",
        status: "submitted",
        createdAt: "..."
      },
      createdAt: "Date",
      expiresAt: "Date"
    }

Create a unique index on `key` and a TTL index on `expiresAt`.

### Rules

1. First request creates the requirement and stores its response against the idempotency key.
2. Repeated request with the same key and same payload returns the original successful response.
3. Same key with a different payload returns HTTP 409.
4. Concurrent requests with the same key must not create duplicate requirements.
5. An incomplete or failed operation must not be treated as successfully completed.

Use a MongoDB transaction for coordinating requirement creation and idempotency record creation if the deployment supports transactions (MongoDB Atlas replica set).

If using transactions, handle duplicate-key races and retry safely.

Document the chosen implementation in the README.

Do not implement a fake idempotency mechanism that only disables the frontend button. Backend idempotency is the important part.

---

# 12. Validation Strategy

Validation must happen on both frontend and backend.

Frontend validation improves usability.

Backend validation protects the API and database.

The backend is authoritative.

### Validation rules

**Event information**

- Event name: 3–100 characters.
- Event type: must be an allowed enum.
- Location: 2–100 characters.
- Venue: optional, maximum 150 characters.
- Start date: valid date and not in the past.
- End date: required for multi-day events and not earlier than the start date.

**Planner**

- At least one service selected.
- Guest count: positive integer.
- Budget: allowed enum.
- Planning scope: allowed enum.

**Performer**

- Performer category: allowed enum.
- Performance type: allowed enum.
- Performer count: positive integer.
- Duration: allowed enum.
- Budget: allowed enum.

**Crew**

- At least one role selected.
- Crew count: positive integer.
- Shift duration: allowed enum.
- Experience: allowed enum.
- Budget: allowed enum.

**Contact**

- Name: 2–100 characters.
- Email: valid email.
- Phone: validate a reasonable international or Indian phone format.
- Description: maximum 2,000 characters.
- Special requirements: maximum 1,000 characters.

### Security validation

- Reject unknown category values.
- Reject unknown category-specific fields.
- Never accept client-supplied MongoDB operators.
- Never trust frontend validation alone.
- Trim strings.
- Normalize email addresses.
- Enforce request body size limits.
- Do not expose internal stack traces in production.

Use Zod schemas with discriminated unions.

---

# 13. Error Handling

Implement one centralized error-handling middleware.

Use consistent response structures.

### Validation error

HTTP 400

    {
      "success": false,
      "message": "Validation failed",
      "errors": [
        {
          "field": "contact.email",
          "message": "Enter a valid email address"
        }
      ]
    }

### Duplicate idempotency key with different payload

HTTP 409

    {
      "success": false,
      "message": "Idempotency key already used with a different request"
    }

### Not found

HTTP 404

    {
      "success": false,
      "message": "Requirement not found"
    }

### Server error

HTTP 500

    {
      "success": false,
      "message": "An unexpected error occurred"
    }

Log detailed internal errors using Pino.

Never return raw database errors or internal stack traces to the frontend.

---

# 14. Performance and Security

Implement the following without introducing unnecessary infrastructure.

### Performance

- Lazy-load non-critical frontend components.
- Avoid unnecessary client-side rendering.
- Use reusable form components.
- Avoid repeated API calls.
- Use efficient MongoDB indexes.
- Use database connection pooling through the MongoDB driver/Mongoose.
- Set appropriate request body limits.
- Avoid loading unnecessary dependencies.

### Security

- Helmet.
- Explicit CORS allowlist.
- Environment-based configuration.
- API rate limiting.
- Request validation.
- Input normalization.
- Safe error responses.
- No credentials in Git.
- No exposure of MongoDB connection strings.
- Do not log contact details or complete request payloads.

Use separate environment configurations for local development and production.

---

# 15. System Design Decisions and Extensibility

The implementation should show that you understand when and why to introduce infrastructure.

### Architecture decision 1: Modular monolith over microservices

Why?

The application has one core domain: requirement management.

Splitting it into multiple services would introduce unnecessary deployment complexity, inter-service communication, and operational overhead.

A modular monolith provides clear boundaries while remaining easy to maintain.

### Architecture decision 2: Single collection with category-specific structures

Why?

All requirements share event, contact, lifecycle, and timestamp information.

A single collection makes common operations simpler.

Discriminated category-specific structures maintain separation between planner, performer, and crew requirements.

### Architecture decision 3: Shared validation contracts

Why?

Frontend and backend must agree on the payload structure.

A shared schema package reduces contract drift and duplicated validation logic.

The backend must still execute its own validation at the API boundary.

### Architecture decision 4: Idempotent submission

Why?

Network retries and duplicate submissions are normal distributed-system failure scenarios.

Idempotency makes the create operation safe to retry.

### Architecture decision 5: Redis and messaging infrastructure

Do not add Redis or RabbitMQ to the initial implementation.

There is no current workload requiring caching, distributed coordination, or asynchronous event processing.

However, design the service layer so future capabilities can be added cleanly.

Potential future extensions:

- Redis for caching or distributed rate limiting.
- RabbitMQ or another message broker for asynchronous notifications.
- Email notifications when requirements are submitted.
- Background processing for requirement matching.
- Admin dashboard for category-based requirement management.
- Search and filtering.
- Vendor matching and recommendation engine.

If the platform later introduces asynchronous processing, use a transactional outbox pattern to avoid losing events between database writes and message publication.

Do not implement these features now. Document them as architectural evolution opportunities.

---

# 16. Testing Requirements

Testing is mandatory.

Use Vitest and Supertest for backend tests.

Use appropriate frontend component tests with React Testing Library and Vitest.

### Backend tests

1. Health endpoint returns 200.
2. Valid planner requirement is created.
3. Valid performer requirement is created.
4. Valid crew requirement is created.
5. Invalid category is rejected.
6. Missing event name is rejected.
7. Invalid email is rejected.
8. Invalid date range is rejected.
9. Category-specific missing fields are rejected.
10. Unknown category-specific fields are rejected.
11. Duplicate idempotency requests do not create duplicate documents.
12. Reusing an idempotency key with different payload returns 409.
13. Database errors are handled safely.

### Frontend tests

1. Step 1 validates required fields.
2. Selecting planner shows planner fields.
3. Selecting performer shows performer fields.
4. Selecting crew shows crew fields.
5. Changing steps preserves values.
6. Changing category resets incompatible fields.
7. Review screen displays the correct data.
8. Successful submission redirects to confirmation.
9. API failure preserves the draft.

### Manual edge cases

- User clicks Submit multiple times.
- User refreshes midway through the wizard.
- User changes category after completing category-specific fields.
- User submits with missing required fields.
- User loses network connectivity.
- Backend is temporarily unavailable.
- Multi-day event has an invalid date range.
- User submits an extremely long description.
- Same idempotency key is reused with modified data.

Document which tests were actually executed and their results.

Do not claim tests pass unless they have been run.

---

# 17. Deployment Strategy

### Frontend

Deploy `apps/web` to Vercel.

Configure:

    NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1

### Backend

Deploy `apps/api` to Render or Railway.

Configure:

    NODE_ENV=production
    PORT=5000
    MONGODB_URI=your-mongodb-atlas-uri
    CLIENT_ORIGIN=https://your-frontend-domain.vercel.app

Additional environment variables may include:

    IDEMPOTENCY_TTL_SECONDS=86400
    LOG_LEVEL=info

Never commit `.env` files.

Provide `.env.example` files without real secrets.

### MongoDB

Use MongoDB Atlas.

- Create a dedicated database.
- Restrict network access appropriately.
- Use a database user with only the required permissions.
- Configure production connection settings.
- Verify indexes during deployment.
- Use a replica-set-capable deployment if implementing transactions.

### Deployment considerations

- Configure CORS for the exact deployed frontend origin.
- Ensure the backend supports production HTTPS.
- Handle graceful shutdown.
- Ensure database connection failures are logged.
- Verify the health endpoint after deployment.
- Test the complete frontend-to-backend-to-database flow on production.

---

# 18. README Requirements

The repository README must include:

1. Project overview.
2. Key features.
3. Technology stack.
4. Architecture diagram.
5. Repository structure.
6. Database design.
7. API documentation.
8. Local setup instructions.
9. Environment variables.
10. Running frontend and backend.
11. Running tests.
12. Deployment links.
13. Screenshots.
14. Architecture decisions.
15. Known limitations.
16. Future improvements.

Include actual screenshots of the working application.

Include sample API request and response examples.

Explain why a modular monolith was chosen and why Redis/RabbitMQ were not introduced.

---

# 19. Git and Code Quality

Use meaningful commit messages.

Suggested sequence:

    chore: initialize pnpm monorepo
    feat: build landing page and application layout
    feat: implement event basics form
    feat: add dynamic category-specific forms
    feat: implement review and submission flow
    feat: create requirement API and MongoDB schema
    feat: add idempotent submission handling
    test: add requirement API integration tests
    test: add frontend wizard tests
    chore: configure production deployment
    docs: add architecture and API documentation

Requirements:

- Strict TypeScript configuration.
- No unnecessary `any`.
- No giant components.
- No duplicated category-specific logic.
- No hardcoded production URLs.
- No exposed secrets.
- No unused dependencies.
- No misleading comments.
- No fake loading states.
- No mocked successful API responses in the final application.

---

# 20. Execution Plan for the AI Coding Agent

Build the application in the following phases.

## Phase 1 — Foundation

- Initialize pnpm monorepo.
- Configure TypeScript.
- Create Next.js application.
- Create Express application.
- Configure shared package.
- Configure environment validation.
- Configure MongoDB connection.
- Verify both applications run locally.

Deliverable: Working frontend and backend foundations.

## Phase 2 — Frontend experience

- Build landing page.
- Build application layout.
- Implement wizard navigation.
- Implement Step 1.
- Implement planner, performer, and crew fields.
- Implement additional requirements.
- Implement review screen.
- Add form validation.
- Implement draft persistence.

Deliverable: Fully functional frontend wizard.

## Phase 3 — Backend

- Create MongoDB models.
- Create category-specific schemas.
- Implement repository.
- Implement service.
- Implement controller.
- Implement API routes.
- Implement validation middleware.
- Implement standardized responses.
- Implement idempotency.
- Implement error handling.

Deliverable: Fully functional REST API.

## Phase 4 — Integration

- Connect frontend to Express.
- Implement submission.
- Handle loading and error states.
- Implement success screen.
- Verify all three categories.
- Verify database persistence.

Deliverable: End-to-end working application.

## Phase 5 — Quality

- Write backend tests.
- Write frontend tests.
- Test edge cases.
- Run TypeScript checks.
- Run linting.
- Fix all console errors.
- Verify responsive behavior.

Deliverable: Tested application.

## Phase 6 — Deployment and documentation

- Deploy frontend.
- Deploy backend.
- Configure MongoDB Atlas.
- Test production API.
- Update README.
- Capture screenshots.
- Record implementation walkthrough.

Deliverable: Submission-ready project.

---

# 21. Definition of Done

The project is complete only when:

- [ ] Landing page is implemented.
- [ ] Event basics form works.
- [ ] Category selection works.
- [ ] Planner fields render correctly.
- [ ] Performer fields render correctly.
- [ ] Crew fields render correctly.
- [ ] Additional details are collected.
- [ ] Step navigation preserves data.
- [ ] Category changes reset incompatible fields.
- [ ] Review screen displays complete information.
- [ ] Backend validates all incoming data.
- [ ] All three categories persist correctly.
- [ ] MongoDB stores structured documents.
- [ ] Idempotency prevents duplicate submissions.
- [ ] API errors are handled consistently.
- [ ] Frontend displays loading and error states.
- [ ] Successful submission displays a unique reference.
- [ ] Automated tests pass.
- [ ] Frontend is deployed.
- [ ] Backend is deployed.
- [ ] Production database integration works.
- [ ] README is complete.
- [ ] GitHub repository is publicly accessible.
- [ ] Screen recording is ready.

---

# 22. Screen Recording Preparation (5–7 Minutes)

Prepare a concise technical walkthrough.

Suggested structure:

**0:00–0:45 — Problem understanding**

Explain the requirement-posting problem, three categories, and the decision to create a dynamic multi-step workflow.

**0:45–2:15 — Frontend walkthrough**

Demonstrate:
- Landing page.
- Event basics.
- Dynamic category selection.
- Different category fields.
- Review and submission.

Explain the centralized form state and shared validation contracts.

**2:15–3:45 — Backend architecture**

Show:
- Express application structure.
- Routes, controllers, services, and repository.
- Zod validation.
- MongoDB model.
- Category-specific document structure.
- Indexes and idempotency.

**3:45–4:45 — Data flow**

Show a real API request.

Demonstrate:
- Request payload.
- API response.
- MongoDB document.
- Successful frontend confirmation.

**4:45–5:45 — Testing and edge cases**

Explain:
- Category validation.
- Invalid input handling.
- Duplicate submission protection.
- Network failure handling.
- Automated tests.

**5:45–6:30 — Architecture decisions**

Explain:
- Why modular monolith.
- Why one requirements collection.
- Why shared schemas.
- Why Redis and RabbitMQ were intentionally excluded.
- How asynchronous processing could be introduced later.

**6:30–7:00 — Conclusion**

Show the deployed application and briefly mention the main limitations and future improvements.

---

# 23. Final Instructions to the AI Coding Agent

Treat this document as the authoritative implementation specification.

Your responsibility is to build a complete, working application, not merely generate a UI prototype.

Follow these rules:

1. Make independent implementation decisions when details are not explicitly specified, provided they remain consistent with this architecture.
2. Prioritize correctness, maintainability, and working functionality over unnecessary abstractions.
3. Use TypeScript end-to-end.
4. Implement the complete user flow before polishing secondary UI details.
5. Never substitute mock API responses for actual backend integration.
6. Never hardcode fake submission success.
7. Validate data on both frontend and backend.
8. Test all three categories independently.
9. Keep the architecture understandable enough to explain in a technical interview.
10. Do not introduce Redis, RabbitMQ, microservices, or other infrastructure unless a genuine requirement emerges.
11. Do not leave TODOs or placeholder implementations in core functionality.
12. Do not claim deployment or testing success without verification.
