# AI Interviewer Frontend# AI Interviewer Frontend



Production-ready Next.js application for AI Interviewer platform. Complete integration with 45+ backend API endpoints for candidate management, interview scheduling, and analytics.Production-ready Next.js application for AI Interviewer platform. Complete integration with 45+ backend API endpoints for candidate management, interview scheduling, and analytics.



## Quick Start## Quick Start



### Prerequisites### Prerequisites

- Node.js 16 or higher- Node.js 16+ installed

- Backend API running on http://localhost:8000- Backend running on `http://localhost:8000`



### Installation### Installation & Launch



```bash```bash

npm install# Install dependencies

npm run devnpm install

```

# Start development server

Access the application at http://localhost:3000npm run dev



### Environment Configuration# Open in browser

# http://localhost:3000

Create `.env.local` in the project root:```



```env### Demo Credentials

NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1```

NEXT_PUBLIC_API_TIMEOUT=30000Admin:    admin@aiinterviewer.com / AdminPass123!@

```HR:       hr@testcorp.com / HRPass123!@

Employee: john@testcorp.com / EmpPass123!@

For production deployments, update the API base URL accordingly.```



## Demo Credentials---



Use these credentials to test the application:## 📚 Documentation



| Role     | Email                    | Password      |- **[INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md)** - Complete implementation overview

|----------|--------------------------|---------------|- **[FRONTEND_SETUP.md](./FRONTEND_SETUP.md)** - Detailed setup guide

| Admin    | admin@aiinterviewer.com  | AdminPass123!@ |- **[FILE_INDEX.md](./FILE_INDEX.md)** - All created files index

| HR       | hr@testcorp.com          | HRPass123!@   |

| Employee | john@testcorp.com        | EmpPass123!@  |---



## Application Structure## ✨ Features



### Core Pages### ✅ Authentication

- JWT-based login/logout

- **Login** (`/login`) - JWT-based authentication with automatic session management- Automatic token refresh

- **Dashboard** (`/dashboard`) - Real-time analytics and candidate funnel visualization- Session persistence

- **Candidates** (`/candidates`) - Candidate management with CRUD operations and bulk import- Role-based access control

- **Employees** (`/employees`) - User directory with role-based filtering

- **Interviews** (`/interviews`) - Interview scheduling with timezone support and tracking### ✅ Candidate Management

- CRUD operations

### Architecture- Bulk import (CSV/Excel)

- Bulk email campaigns

The application follows a layered architecture:- Real-time analytics



```### ✅ Interview Scheduling

src/- Schedule with timezone support

├── lib/- Batch scheduling

│   ├── api-client.ts          - Axios instance with interceptors and token refresh- Interview tracking

│   ├── config.ts              - Centralized configuration- Scoring system

│   ├── error-handler.ts       - Error handling and logging

│   └── utils-advanced.ts      - Utility functions and type guards### ✅ User Management

├── services/- Employee directory

│   ├── auth.service.ts        - Authentication endpoints- Create/edit/delete users

│   ├── users.service.ts       - User management- Search & filter

│   ├── candidates.service.ts  - Candidate operations and bulk import

│   ├── interviews.service.ts  - Interview scheduling and scoring---

│   └── company.service.ts     - Company operations

├── hooks/## 🏗️ Architecture

│   ├── use-auth.ts            - Authentication hooks

│   ├── use-users.ts           - User management hooks- **API Layer** - Service modules with Axios

│   ├── use-candidates.ts      - Candidate management hooks- **Custom Hooks** - React Query integration

│   ├── use-interviews.ts      - Interview scheduling hooks- **State Management** - AuthContext + React Query

│   └── use-company.ts         - Company hooks- **Type Safety** - Full TypeScript support

├── contexts/

│   └── AuthContext.tsx        - Global authentication state with token refresh---

└── components/

    ├── ProtectedRoute.tsx     - Role-based route protection## 📊 API Coverage

    ├── layout/                - Layout components

    ├── dashboard/             - Dashboard components**45+ Endpoints Connected**

    ├── employees/             - Employee management components- Authentication (5)

    └── ui/                    - shadcn-ui component library- Users (7)

```- Candidates (11)

- Interviews (15)

## API Integration- Scores (3)

- Company (3)

### Service Modules (45+ Endpoints)

---

**Authentication Service**

- POST `/auth/login` - User login with email and password## 🔧 Tech Stack

- POST `/auth/refresh` - Refresh access token

- POST `/auth/logout` - Logout and invalidate session- Next.js 15

- POST `/auth/verify-email` - Verify email address- React 18

- POST `/auth/resend-verification` - Resend verification email- TypeScript

- Tailwind CSS

**Users Service**- shadcn-ui

- GET `/users` - List users with pagination- Axios

- POST `/users` - Create new user- React Query

- GET `/users/{id}` - Get user details

- PUT `/users/{id}` - Update user---

- DELETE `/users/{id}` - Delete user

- GET `/users/me` - Get current logged-in user## 📈 Status

- POST `/users/{id}/change-password` - Change password

✅ All 45+ API endpoints connected  

**Candidates Service**✅ Production-ready code  

- GET `/candidates` - List candidates with filters and pagination✅ Complete documentation  

- POST `/candidates` - Create candidate✅ Zero mock data  

- GET `/candidates/{id}` - Get candidate details✅ Error handling implemented

- PUT `/candidates/{id}` - Update candidate

- DELETE `/candidates/{id}` - Delete candidate**Last Updated:** November 2025 | **Version:** 1.0.0

- POST `/candidates/bulk/import` - Bulk import from JSON
- POST `/candidates/bulk/import/file` - Bulk import from CSV/Excel
- GET `/candidates/bulk/import/{job_id}` - Check import job status
- POST `/candidates/bulk/send-email` - Send bulk emails
- GET `/candidates/dashboard/stats` - Dashboard analytics
- GET `/candidates/funnel/analytics` - Funnel analysis
- GET `/candidates/time-to-hire/metrics` - Time to hire metrics

**Interviews Service**
- GET `/interview-rounds` - List interview rounds
- POST `/interview-rounds` - Schedule interview round
- GET `/interview-rounds/{id}` - Get interview round details
- PUT `/interview-rounds/{id}` - Update interview round
- DELETE `/interview-rounds/{id}` - Cancel interview
- POST `/interview-rounds/batch/schedule` - Schedule multiple rounds
- POST `/interview-rounds/{id}/reschedule` - Reschedule interview
- POST `/interview-rounds/{id}/start` - Start interview
- POST `/interview-rounds/{id}/complete` - Complete interview
- GET `/candidates/{id}/round-progress` - Get candidate round progress
- GET `/interviewers/{id}/schedule` - Get interviewer calendar
- GET `/interview-rounds/upcoming` - List upcoming interviews
- POST `/scores` - Create score/evaluation
- GET `/scores/{id}` - Get score details
- PUT `/scores/{id}` - Update score

**Company Service**
- GET `/companies` - List companies
- POST `/companies` - Create company
- GET `/companies/{id}` - Get company details
- PUT `/companies/{id}` - Update company

### Data Fetching with React Query

All data fetching uses React Query with automatic caching, pagination, and refetch on focus:

```typescript
// Example: Fetch candidates
const { data, isLoading, error } = useListCandidates({
  skip: 0,
  limit: 20,
  status: 'screening'
});

// Example: Create candidate
const { mutate, isPending } = useCreateCandidate();
mutate({ email, name }, {
  onSuccess: () => console.log('Created'),
  onError: (error) => console.error(error)
});
```

## Authentication Flow

The application implements JWT-based authentication with automatic token refresh:

1. **Login** - User submits credentials to `/auth/login`
2. **Token Storage** - Access token stored in localStorage, refresh token in HTTP-only cookie
3. **API Requests** - Axios interceptor automatically adds `Authorization: Bearer {token}` header
4. **Token Refresh** - On 401 response, automatically attempts refresh via `/auth/refresh`
5. **Session Persistence** - On app load, validates stored token and restores user session
6. **Logout** - Clears all tokens and redirects to login

Access tokens have shorter expiration (typically 15 minutes) while refresh tokens are longer-lived (7-30 days). The frontend handles token refresh transparently.

## Features

### Candidate Management
- View paginated candidate list with search and filtering
- Create individual candidates or bulk import from CSV/Excel files
- Track candidate status through recruitment pipeline (applied, screening, assessment, interview, offer, accepted, rejected)
- Send bulk email campaigns to candidate groups
- Real-time dashboard statistics

### Interview Scheduling
- Schedule interviews with timezone support (400+ IANA timezones)
- Automatic daylight saving time (DST) handling
- Batch schedule multiple interview rounds with date progression
- Reschedule existing interviews
- Track interview status (scheduled, in-progress, completed, cancelled)
- Evaluation scoring system for each round

### Analytics
- Dashboard metrics: Total candidates, by status, conversion rate
- Funnel analysis with drop-off rates at each stage
- Time to hire metrics by department
- Upcoming interviews calendar view

### User Management
- View employee directory with search
- Create new employees with role assignment
- Update employee information
- Delete employees with confirmation

### Role-Based Access Control
- Admin: Full access to all features
- HR: Candidate management, interview scheduling, bulk operations
- Employee: View-only access to assigned candidates
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
