# AI Interviewer Frontend# AI Interviewer Frontend# AI Interviewer Frontend# AI Interviewer Frontend



Production-ready Next.js application for the AI Interviewer platform. Complete integration with 45+ backend API endpoints supporting multi-tenant SaaS with 4 user roles (Admin, HR, Employee, Candidate).



## Quick StartProduction-ready Next.js application for AI Interviewer platform. Complete integration with 45+ backend API endpoints for candidate management, interview scheduling, and analytics.



### Prerequisites

- Node.js 16 or higher

- Backend API running on http://localhost:8000/api/v1## Quick StartProduction-ready Next.js application for AI Interviewer platform. Complete integration with 45+ backend API endpoints for candidate management, interview scheduling, and analytics.Production-ready Next.js application for AI Interviewer platform. Complete integration with 45+ backend API endpoints for candidate management, interview scheduling, and analytics.

- Docker (optional, for containerized deployment)



### Installation

### Prerequisites

```bash

npm install- Node.js 16 or higher

npm run dev

```- Backend API running on http://localhost:8000## Quick Start## Quick Start



Access at http://localhost:3000- Docker (optional, for containerized deployment)



### Environment Setup



Create `.env.local`:### Installation



```env### Prerequisites### Prerequisites

NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

NEXT_PUBLIC_API_TIMEOUT=30000```bash

NODE_ENV=development

```npm install- Node.js 16 or higher- Node.js 16+ installed



### Dockernpm run dev



```bash```- Backend API running on http://localhost:8000- Backend running on `http://localhost:8000`

# Production

docker compose up --build



# Development with hot reloadAccess the application at http://localhost:3000

docker compose -f docker-compose.dev.yml up --build

```



## Demo Credentials### Using Docker### Installation### Installation & Launch



| Role     | Email                    | Password      |

|----------|--------------------------|---------------|

| Admin    | admin@aiinterviewer.com  | AdminPass123!@ |```bash

| HR       | hr@testcorp.com          | HRPass123!@   |

| Employee | john@testcorp.com        | EmpPass123!@  |# Production

| Candidate| jane@aiinterviewer.com   | CandPass123!@ |

docker compose up --build```bash```bash

## User Roles & Permissions



### Admin

- Full platform control# Development with hot reloadnpm install# Install dependencies

- Create and manage companies

- View all users and audit logsdocker compose -f docker-compose.dev.yml up --build

- System health monitoring

```npm run devnpm install

### HR

- Manage company users

- Create and invite employees

- Manage candidates### Environment Configuration```

- Schedule and track interviews

- View analytics and reports

- Email management

Create `.env.local` in the project root:# Start development server

### Employee

- Conduct interviews

- Score candidates

- View assigned interviews```envAccess the application at http://localhost:3000npm run dev

- Dashboard with upcoming interviews

NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

### Candidate

- View own interview scheduleNEXT_PUBLIC_API_TIMEOUT=30000

- Check interview status

- Attend scheduled interviews```



## Application Architecture### Environment Configuration# Open in browser



### Directory Structure## Demo Credentials



```# http://localhost:3000

src/

├── lib/| Role     | Email                    | Password      |

│   ├── api-client.ts              # Axios with interceptors & token refresh

│   ├── config.ts                  # Centralized config|----------|--------------------------|---------------|Create `.env.local` in the project root:```

│   ├── error-handler.ts           # Error handling

│   └── utils-advanced.ts          # Utility functions| Admin    | admin@aiinterviewer.com  | AdminPass123!@ |

├── services/

│   ├── auth.service.ts            # Authentication (login, refresh, verify)| HR       | hr@testcorp.com          | HRPass123!@   |

│   ├── users.service.ts           # User CRUD

│   ├── candidates.service.ts      # Candidate management| Employee | john@testcorp.com        | EmpPass123!@  |

│   ├── interviews.service.ts      # Interview scheduling

│   └── company.service.ts         # Company operations```env### Demo Credentials

├── hooks/

│   ├── use-auth.ts                # Auth mutations## Application Pages

│   ├── use-users.ts               # User queries/mutations

│   ├── use-candidates.ts          # Candidate queries/mutationsNEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1```

│   ├── use-interviews.ts          # Interview queries/mutations

│   └── use-company.ts             # Company queries/mutations### Auth

├── contexts/

│   └── AuthContext.tsx            # Global auth state- **Login** (`/login`) - JWT authentication with email and passwordNEXT_PUBLIC_API_TIMEOUT=30000Admin:    admin@aiinterviewer.com / AdminPass123!@

└── components/

    ├── ProtectedRoute.tsx         # Role-based route wrapper- **Register** (`/register`) - Create new account with email verification

    ├── layout/

    ├── dashboard/```HR:       hr@testcorp.com / HRPass123!@

    ├── employees/

    ├── ui/                        # shadcn-ui components### Dashboard & Analytics



app/- **Dashboard** (`/dashboard`) - Overview with metrics and employee directoryEmployee: john@testcorp.com / EmpPass123!@

├── login/page.tsx                 # Login page

├── dashboard/page.tsx             # Dashboard- **Reports** (`/reports`) - Candidate funnel, time-to-hire, analytics

├── candidates/page.tsx            # Candidates list

├── employees/page.tsx             # User management- **Settings** (`/settings`) - Account management and logoutFor production deployments, update the API base URL accordingly.```

├── interviews/page.tsx            # Interview scheduling

└── settings/page.tsx              # Settings & logout

```

### Candidate Management

## API Integration (45+ Endpoints)

- **Candidates List** (`/candidates`) - Table with filtering, search, pagination

### Authentication Service (5)

- `POST /auth/login` - User login- **Candidate Detail** (`/candidates/{id}`) - View history, interviews, scores## Demo Credentials---

- `POST /auth/refresh` - Refresh access token

- `POST /auth/logout` - Invalidate session- **Create Candidate** - Modal form for single or bulk import

- `POST /auth/verify-email` - Verify email address

- `POST /auth/resend-verification` - Resend verification



### Users Service (7)### Interview Management

- `GET /users` - List users (paginated, filtered)

- `POST /users` - Create user- **Interviews** (`/interviews`) - Schedule, list, and track interview roundsUse these credentials to test the application:## 📚 Documentation

- `GET /users/{id}` - Get user details

- `PUT /users/{id}` - Update user- **Schedule Interview** - Modal form with timezone support

- `DELETE /users/{id}` - Delete user

- `GET /users/me` - Current user

- `POST /users/{id}/change-password` - Change password

### User Management

### Candidates Service (11)

- `GET /candidates` - List candidates- **Employees** (`/employees`) - Employee directory with CRUD operations| Role     | Email                    | Password      |- **[INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md)** - Complete implementation overview

- `POST /candidates` - Create candidate

- `GET /candidates/{id}` - Get candidate details- **Create Employee** - Modal form with role assignment

- `PUT /candidates/{id}` - Update candidate

- `DELETE /candidates/{id}` - Delete candidate|----------|--------------------------|---------------|- **[FRONTEND_SETUP.md](./FRONTEND_SETUP.md)** - Detailed setup guide

- `POST /candidates/bulk/import` - Bulk import JSON

- `POST /candidates/bulk/import/file` - Bulk import CSV/Excel### Admin

- `GET /candidates/bulk/import/{job_id}` - Import progress

- `POST /candidates/bulk/send-email` - Bulk email- **Admin Dashboard** (`/admin/dashboard`) - System health, company management| Admin    | admin@aiinterviewer.com  | AdminPass123!@ |- **[FILE_INDEX.md](./FILE_INDEX.md)** - All created files index

- `GET /candidates/dashboard/stats` - Dashboard metrics

- `GET /candidates/funnel/analytics` - Funnel analysis- **Company Management** (`/admin/companies`) - Create and manage companies

- `GET /candidates/time-to-hire/metrics` - Time to hire

| HR       | hr@testcorp.com          | HRPass123!@   |

### Interviews Service (15)

- `GET /interview-rounds` - List interviews## Architecture

- `POST /interview-rounds` - Schedule interview

- `GET /interview-rounds/{id}` - Interview details| Employee | john@testcorp.com        | EmpPass123!@  |---

- `PUT /interview-rounds/{id}` - Update interview

- `DELETE /interview-rounds/{id}` - Cancel interview```

- `POST /interview-rounds/batch/schedule` - Batch schedule

- `POST /interview-rounds/{id}/reschedule` - Reschedulesrc/

- `POST /interview-rounds/{id}/start` - Start interview

- `POST /interview-rounds/{id}/complete` - Complete interview├── lib/

- `GET /interview-rounds/upcoming` - Upcoming (next 7 days)

- `GET /candidates/{id}/round-progress` - Candidate progress│   ├── api-client.ts          - Axios with interceptors & token refresh## Application Structure## ✨ Features

- `POST /scores` - Create score/evaluation

- `GET /scores/{id}` - Get score details│   ├── config.ts              - Centralized configuration

- `PUT /scores/{id}` - Update score

- `GET /interviewers/{id}/schedule` - Interviewer calendar│   ├── error-handler.ts       - Error handling & logging



### Company Service (3)│   └── utils-advanced.ts      - Utilities & type guards

- `GET /companies` - List companies

- `POST /companies` - Create company├── services/### Core Pages### ✅ Authentication

- `GET /companies/{id}` - Company details

- `PUT /companies/{id}` - Update company│   ├── auth.service.ts        - Authentication endpoints



## Key Features│   ├── users.service.ts       - User management- JWT-based login/logout



### Authentication & Security│   ├── candidates.service.ts  - Candidate operations & bulk import

- JWT-based authentication (access + refresh tokens)

- Automatic token refresh before expiry│   ├── interviews.service.ts  - Interview scheduling & scoring- **Login** (`/login`) - JWT-based authentication with automatic session management- Automatic token refresh

- Secure httpOnly cookie storage

- 401 error handling with auto-redirect│   └── company.service.ts     - Company operations

- Role-based access control

├── hooks/- **Dashboard** (`/dashboard`) - Real-time analytics and candidate funnel visualization- Session persistence

### Candidate Management

- Full CRUD operations│   ├── use-auth.ts            - Authentication hooks

- Status filtering (applied, screening, assessment, interview, offer, accepted, rejected)

- Domain filtering│   ├── use-users.ts           - User management hooks- **Candidates** (`/candidates`) - Candidate management with CRUD operations and bulk import- Role-based access control

- Bulk import from CSV/Excel with progress tracking

- Bulk email campaigns│   ├── use-candidates.ts      - Candidate management hooks

- Candidate history and interview tracking

│   ├── use-interviews.ts      - Interview hooks- **Employees** (`/employees`) - User directory with role-based filtering

### Interview Scheduling

- Schedule single or batch interviews│   └── use-company.ts         - Company hooks

- Timezone support (400+ IANA zones)

- Automatic DST handling├── contexts/- **Interviews** (`/interviews`) - Interview scheduling with timezone support and tracking### ✅ Candidate Management

- Reschedule with reason tracking

- Interview status tracking│   └── AuthContext.tsx        - Global auth state & methods

- Scoring system for each round

└── components/- CRUD operations

### Analytics & Reporting

- Real-time dashboard metrics    ├── ProtectedRoute.tsx     - Role-based route protection

- Candidate funnel analysis with drop-off rates

- Time-to-hire metrics by department    ├── layout/                - Layout components### Architecture- Bulk import (CSV/Excel)

- Upcoming interviews calendar

- System health monitoring    ├── dashboard/             - Dashboard components



### User Management    ├── employees/             - Employee components- Bulk email campaigns

- Create, edit, delete users

- Role-based access control    └── ui/                    - shadcn-ui components

- Department assignment

- Password change functionality```The application follows a layered architecture:- Real-time analytics



## Development



### Build for Production## API Integration (45+ Endpoints)



```bash

npm run build

npm start### Authentication Service```### ✅ Interview Scheduling

```

- POST `/auth/login` - User login

### Code Quality

- POST `/auth/refresh` - Refresh tokensrc/- Schedule with timezone support

```bash

npm run lint- POST `/auth/logout` - Logout

```

- POST `/auth/verify-email` - Verify email├── lib/- Batch scheduling

### Available Scripts

- POST `/auth/resend-verification` - Resend verification

- `npm run dev` - Start development server

- `npm run build` - Build for production│   ├── api-client.ts          - Axios instance with interceptors and token refresh- Interview tracking

- `npm start` - Start production server

- `npm run lint` - Run ESLint### Users Service



## Technology Stack- GET `/users` - List users (paginated)│   ├── config.ts              - Centralized configuration- Scoring system



- **Framework**: Next.js 15 (App Router)- POST `/users` - Create user

- **Language**: TypeScript

- **State Management**: React Context + React Query- GET `/users/{id}` - Get user details│   ├── error-handler.ts       - Error handling and logging

- **HTTP Client**: Axios with interceptors

- **UI Framework**: Tailwind CSS + shadcn-ui- PUT `/users/{id}` - Update user

- **Icons**: Lucide React

- **Notifications**: Sonner- DELETE `/users/{id}` - Delete user│   └── utils-advanced.ts      - Utility functions and type guards### ✅ User Management

- **Form Validation**: Zod

- **Data Fetching**: TanStack React Query- GET `/users/me` - Current user



## Error Handling- POST `/users/{id}/change-password` - Change password├── services/- Employee directory



- **401 Unauthorized** - Auto token refresh or redirect to login

- **403 Forbidden** - Permission error with required roles

- **404 Not Found** - Navigate to 404 page### Candidates Service│   ├── auth.service.ts        - Authentication endpoints- Create/edit/delete users

- **422 Validation** - Display field-specific errors

- **5xx Server Errors** - Toast notification with retry- GET `/candidates` - List candidates

- **Network Errors** - Automatic retry with exponential backoff

- POST `/candidates` - Create candidate│   ├── users.service.ts       - User management- Search & filter

All errors are logged with context for debugging.

- GET `/candidates/{id}` - Candidate details

## Performance Optimization

- PUT `/candidates/{id}` - Update candidate│   ├── candidates.service.ts  - Candidate operations and bulk import

- React Query automatic caching and refetching

- Pagination on all list endpoints (default 20 items/page)- DELETE `/candidates/{id}` - Delete candidate

- Lazy loading of route components

- Image optimization with Next.js Image- POST `/candidates/bulk/import` - Bulk import JSON│   ├── interviews.service.ts  - Interview scheduling and scoring---

- Code splitting with dynamic imports

- CSS-in-JS with Tailwind for minimal bundle- POST `/candidates/bulk/import/file` - Bulk import CSV/Excel



## Multi-Tenant Architecture- GET `/candidates/bulk/import/{job_id}` - Import status│   └── company.service.ts     - Company operations



- Automatic company_id scoping (handled by backend)- POST `/candidates/bulk/send-email` - Send emails

- Role-based access control

- Secure user isolation- GET `/candidates/dashboard/stats` - Analytics├── hooks/## 🏗️ Architecture

- Company-specific data filtering

- Audit logging- GET `/candidates/funnel/analytics` - Funnel data



## Browser Support- GET `/candidates/time-to-hire/metrics` - Time metrics│   ├── use-auth.ts            - Authentication hooks



- Chrome/Edge 90+

- Firefox 88+

- Safari 14+### Interviews Service│   ├── use-users.ts           - User management hooks- **API Layer** - Service modules with Axios

- Mobile browsers (iOS Safari, Chrome Mobile)

- GET `/interview-rounds` - List interviews

## Troubleshooting

- POST `/interview-rounds` - Schedule interview│   ├── use-candidates.ts      - Candidate management hooks- **Custom Hooks** - React Query integration

### Backend Connection Issues

1. Verify backend on http://localhost:8000- GET `/interview-rounds/{id}` - Interview details

2. Check `NEXT_PUBLIC_API_BASE_URL` in .env.local

3. Ensure CORS configured on backend- PUT `/interview-rounds/{id}` - Update interview│   ├── use-interviews.ts      - Interview scheduling hooks- **State Management** - AuthContext + React Query

4. Check browser DevTools Network tab

- DELETE `/interview-rounds/{id}` - Cancel interview

### Authentication Issues

1. Clear localStorage and cookies- POST `/interview-rounds/batch/schedule` - Batch schedule│   └── use-company.ts         - Company hooks- **Type Safety** - Full TypeScript support

2. Verify credentials match backend

3. Check token expiration- POST `/interview-rounds/{id}/reschedule` - Reschedule

4. Ensure refresh endpoint working

- POST `/interview-rounds/{id}/start` - Start interview├── contexts/

### Data Not Loading

1. Check React Query DevTools- POST `/interview-rounds/{id}/complete` - Complete interview

2. Verify API endpoint exists

3. Check browser console errors- GET `/candidates/{id}/round-progress` - Candidate progress│   └── AuthContext.tsx        - Global authentication state with token refresh---

4. Ensure proper role permissions

- GET `/interviewers/{id}/schedule` - Interviewer calendar

## Docker Commands

- GET `/interview-rounds/upcoming` - Upcoming interviews└── components/

```bash

# View logs- POST `/scores` - Create score

docker compose logs -f frontend

- GET `/scores/{id}` - Get score    ├── ProtectedRoute.tsx     - Role-based route protection## 📊 API Coverage

# Stop containers

docker compose down- PUT `/scores/{id}` - Update score



# Rebuild    ├── layout/                - Layout components

docker compose up --build

### Company Service

# Access container shell

docker exec -it ai-interviewer-frontend sh- GET `/companies` - List companies    ├── dashboard/             - Dashboard components**45+ Endpoints Connected**

```

- POST `/companies` - Create company

## License

- GET `/companies/{id}` - Company details    ├── employees/             - Employee management components- Authentication (5)

Internal use only - AI Interviewer Platform

- PUT `/companies/{id}` - Update company

## Support

    └── ui/                    - shadcn-ui component library- Users (7)

For technical issues or questions, contact the development team.

## Features

```- Candidates (11)

### Authentication

- JWT-based login/logout- Interviews (15)

- Automatic token refresh on 401

- Session persistence via localStorage## API Integration- Scores (3)

- Email verification workflow

- Role-based access control- Company (3)



### Candidate Management### Service Modules (45+ Endpoints)

- View paginated candidate list with advanced filtering

- Create single or bulk import candidates---

- Track status through recruitment pipeline

- Send bulk email campaigns**Authentication Service**

- Real-time analytics dashboard

- POST `/auth/login` - User login with email and password## 🔧 Tech Stack

### Interview Scheduling

- Schedule interviews with timezone support (400+ zones)- POST `/auth/refresh` - Refresh access token

- Batch schedule multiple rounds

- Reschedule and cancel interviews- POST `/auth/logout` - Logout and invalidate session- Next.js 15

- Interview status tracking

- Evaluation scoring system- POST `/auth/verify-email` - Verify email address- React 18

- Interviewer calendar view

- POST `/auth/resend-verification` - Resend verification email- TypeScript

### User Management

- Employee directory with search- Tailwind CSS

- Create, update, delete employees

- Role assignment (ADMIN, HR, EMPLOYEE, CANDIDATE)**Users Service**- shadcn-ui

- Department and manager tracking

- Password management- GET `/users` - List users with pagination- Axios



### Analytics & Reporting- POST `/users` - Create new user- React Query

- Candidate funnel visualization

- Time-to-hire metrics by department- GET `/users/{id}` - Get user details

- Conversion rate tracking

- Dashboard metrics overview- PUT `/users/{id}` - Update user---

- System health monitoring

- DELETE `/users/{id}` - Delete user

### Admin Features

- Company management- GET `/users/me` - Get current logged-in user## 📈 Status

- Multi-company support

- User role administration- POST `/users/{id}/change-password` - Change password

- System configuration

✅ All 45+ API endpoints connected  

## Role-Based Access Control

**Candidates Service**✅ Production-ready code  

- **ADMIN** - Full system access, user management, company setup

- **HR** - Candidate management, interview scheduling, analytics- GET `/candidates` - List candidates with filters and pagination✅ Complete documentation  

- **EMPLOYEE** - View assigned candidates, participate in interviews

- **CANDIDATE** - View own interview schedule, submission status- POST `/candidates` - Create candidate✅ Zero mock data  



## Error Handling- GET `/candidates/{id}` - Get candidate details✅ Error handling implemented



- Network error retry with exponential backoff- PUT `/candidates/{id}` - Update candidate

- 401 Unauthorized - Automatic token refresh or redirect to login

- 403 Forbidden - Permission error display- DELETE `/candidates/{id}` - Delete candidate**Last Updated:** November 2025 | **Version:** 1.0.0

- 404 Not Found - Navigation to 404 page

- 5xx Server Errors - Error toast with retry option- POST `/candidates/bulk/import` - Bulk import from JSON

- Form validation - Field-specific error messages- POST `/candidates/bulk/import/file` - Bulk import from CSV/Excel

- Toast notifications for user feedback- GET `/candidates/bulk/import/{job_id}` - Check import job status

- POST `/candidates/bulk/send-email` - Send bulk emails

## Performance Optimization- GET `/candidates/dashboard/stats` - Dashboard analytics

- GET `/candidates/funnel/analytics` - Funnel analysis

- React Query caching and auto-refetching- GET `/candidates/time-to-hire/metrics` - Time to hire metrics

- Automatic cache invalidation on mutations

- Pagination (20 items per page default)**Interviews Service**

- Lazy loading components- GET `/interview-rounds` - List interview rounds

- Image optimization- POST `/interview-rounds` - Schedule interview round

- CSS-in-JS with Tailwind- GET `/interview-rounds/{id}` - Get interview round details

- Code splitting with dynamic imports- PUT `/interview-rounds/{id}` - Update interview round

- DELETE `/interview-rounds/{id}` - Cancel interview

## Development- POST `/interview-rounds/batch/schedule` - Schedule multiple rounds

- POST `/interview-rounds/{id}/reschedule` - Reschedule interview

### Building for Production- POST `/interview-rounds/{id}/start` - Start interview

- POST `/interview-rounds/{id}/complete` - Complete interview

```bash- GET `/candidates/{id}/round-progress` - Get candidate round progress

npm run build- GET `/interviewers/{id}/schedule` - Get interviewer calendar

npm start- GET `/interview-rounds/upcoming` - List upcoming interviews

```- POST `/scores` - Create score/evaluation

- GET `/scores/{id}` - Get score details

### Testing- PUT `/scores/{id}` - Update score



```bash**Company Service**

npm test- GET `/companies` - List companies

```- POST `/companies` - Create company

- GET `/companies/{id}` - Get company details

### Linting- PUT `/companies/{id}` - Update company



```bash### Data Fetching with React Query

npm run lint

```All data fetching uses React Query with automatic caching, pagination, and refetch on focus:



## Dependencies```typescript

// Example: Fetch candidates

- **next** - React frameworkconst { data, isLoading, error } = useListCandidates({

- **react** - UI library  skip: 0,

- **typescript** - Type safety  limit: 20,

- **axios** - HTTP client  status: 'screening'

- **@tanstack/react-query** - Data fetching & caching});

- **tailwindcss** - CSS framework

- **lucide-react** - Icon library// Example: Create candidate

- **sonner** - Toast notificationsconst { mutate, isPending } = useCreateCandidate();

- **zod** - Schema validationmutate({ email, name }, {

  onSuccess: () => console.log('Created'),

## Browser Support  onError: (error) => console.error(error)

});

- Chrome/Edge 90+```

- Firefox 88+

- Safari 14+## Authentication Flow

- Mobile browsers (iOS Safari, Chrome Mobile)

The application implements JWT-based authentication with automatic token refresh:

## Troubleshooting

1. **Login** - User submits credentials to `/auth/login`

### Backend Connection Issues2. **Token Storage** - Access token stored in localStorage, refresh token in HTTP-only cookie

1. Verify backend is running: `curl http://localhost:8000/health`3. **API Requests** - Axios interceptor automatically adds `Authorization: Bearer {token}` header

2. Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`4. **Token Refresh** - On 401 response, automatically attempts refresh via `/auth/refresh`

3. Ensure CORS enabled on backend5. **Session Persistence** - On app load, validates stored token and restores user session

4. Check network tab in DevTools6. **Logout** - Clears all tokens and redirects to login



### Authentication IssuesAccess tokens have shorter expiration (typically 15 minutes) while refresh tokens are longer-lived (7-30 days). The frontend handles token refresh transparently.

1. Clear browser storage: `localStorage.clear()`

2. Verify demo credentials with backend## Features

3. Check token expiration in localStorage

4. Ensure refresh token endpoint is working### Candidate Management

- View paginated candidate list with search and filtering

### Data Not Loading- Create individual candidates or bulk import from CSV/Excel files

1. Check React Query DevTools for query status- Track candidate status through recruitment pipeline (applied, screening, assessment, interview, offer, accepted, rejected)

2. Verify API endpoint exists and responds- Send bulk email campaigns to candidate groups

3. Check browser console for errors- Real-time dashboard statistics

4. Ensure user has role permissions

### Interview Scheduling

## Docker Commands- Schedule interviews with timezone support (400+ IANA timezones)

- Automatic daylight saving time (DST) handling

```bash- Batch schedule multiple interview rounds with date progression

# View logs- Reschedule existing interviews

docker compose logs -f frontend- Track interview status (scheduled, in-progress, completed, cancelled)

- Evaluation scoring system for each round

# Stop containers

docker compose down### Analytics

- Dashboard metrics: Total candidates, by status, conversion rate

# Rebuild- Funnel analysis with drop-off rates at each stage

docker compose up --build- Time to hire metrics by department

- Upcoming interviews calendar view

# Access container shell

docker exec -it ai-interviewer-frontend sh### User Management

```- View employee directory with search

- Create new employees with role assignment

## License- Update employee information

- Delete employees with confirmation

Internal use only - AI Interviewer Platform

### Role-Based Access Control

## Support- Admin: Full access to all features

- HR: Candidate management, interview scheduling, bulk operations

For technical issues or questions, contact the development team.- Employee: View-only access to assigned candidates

- Candidate: View own interview schedule and results

## Error Handling

The application implements comprehensive error handling:

- **Network Errors** - Automatic retry with exponential backoff
- **401 Unauthorized** - Automatic token refresh or redirect to login
- **403 Forbidden** - Display permission error with required roles
- **404 Not Found** - Navigate to 404 page
- **5xx Server Errors** - Show error toast with retry option
- **Validation Errors** - Display field-specific error messages
- **Form Validation** - Client-side validation with Zod schema support

All errors are logged to console in development mode with context information.

## Performance Optimization

- React Query handles automatic caching and background refetching
- Pagination on all list endpoints (default 20 items per page)
- Lazy loading of components
- Image optimization with Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle size
- Code splitting with dynamic imports

## Development

### Building for Production

```bash
npm run build
npm start
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Dependencies

- **next** - React framework
- **react** - UI library
- **typescript** - Type safety
- **axios** - HTTP client
- **@tanstack/react-query** - Data fetching and caching
- **tailwindcss** - CSS framework
- **lucide-react** - Icon library
- **sonner** - Toast notifications
- **zod** - Schema validation

## Troubleshooting

### Backend Connection Issues
1. Verify backend is running on http://localhost:8000
2. Check NEXT_PUBLIC_API_BASE_URL in .env.local
3. Ensure CORS is configured on backend
4. Check network tab in browser DevTools for failed requests

### Authentication Issues
1. Clear browser localStorage and cookies
2. Verify demo credentials with backend
3. Check token expiration in browser DevTools
4. Ensure refresh token endpoint is working

### Data Not Loading
1. Check React Query DevTools for query status
2. Verify API endpoint exists and is accessible
3. Check error messages in browser console
4. Ensure proper role permissions for endpoint access

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Internal use only - AI Interviewer Platform
