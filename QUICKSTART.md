# 🚀 Quick Start Guide - AI Interviewer Frontend

## Prerequisites
- Node.js 18+ installed
- Backend running on `http://localhost:8000`
- npm or yarn package manager

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (if needed)
# Edit .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

## Development

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

## Test User Credentials

Admin Account (System Administrator)
```
Email: admin@aiinterviewer.com
Password: AdminPass123!@
```

HR Account (Recruitment Manager)
```
Email: hr@testcorp.com
Password: HRPass123!@
```

Employee Account (Interviewer)
```
Email: john@testcorp.com
Password: EmpPass123!@
```

## Key User Flows

### 1. Admin: Create Company & HR User
```
1. Login as ADMIN
2. Go to /admin/companies
3. Click "Create Company"
4. Fill in company details
5. Go to /employees
6. Click "Add Employee"
7. Create first HR user
8. Send credentials to HR manager
```

### 2. HR: Build Team & Add Candidates
```
1. Login as HR
2. Go to /employees → Add employees (interviewers)
3. Go to /candidates
4. Click "Add Candidate" OR "Bulk Import"
5. Create candidates
6. Go to /interviews
7. Click "Schedule Interview"
8. Select candidate, interviewer, round type, date/time
```

### 3. Employee: Conduct Interview
```
1. Login as EMPLOYEE
2. Go to /employee/interviews
3. Click interview
4. Click "Start Interview"
5. Take notes during interview (optional)
6. Click "End Interview"
7. Fill evaluation scores:
   - Communication (0-100)
   - Technical (0-100)
   - Behaviour (0-100)
8. Click "Submit Evaluation"
```

### 4. HR: Monitor Progress
```
1. Go to /hr/dashboard → See pipeline
2. Go to /candidates → View all candidates and their status
3. Click on candidate to see interview history
4. Go to /reports → See funnel and metrics
```

### 5. Candidate: Check Interview Status
```
1. Login as CANDIDATE
2. Go to /candidate/interviews
3. View scheduled interview dates and times
4. (Read-only access)
```

## Application Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration
- `/verify-email` - Email verification
- `/account/change-password` - Password reset

### Admin Routes (ADMIN only)
- `/admin/dashboard` - System overview
- `/admin/companies` - Manage companies
- `/admin/logs` - Audit logs

### HR Routes (HR only)
- `/hr/dashboard` - Pipeline overview
- `/candidates` - Manage candidates
- `/employees` - Manage team
- `/interviews` - Schedule interviews
- `/reports` - Analytics

### Employee Routes (EMPLOYEE only)
- `/employee/dashboard` - My overview
- `/employee/interviews` - My interviews
- `/interviews/[id]` - Conduct interview

### Candidate Routes (CANDIDATE only)
- `/candidate/dashboard` - Status overview
- `/candidate/interviews` - My interviews

## Common Tasks

### Add a Candidate
```
1. Go to /candidates
2. Click "Add Candidate"
3. Enter name, email, domain
4. Click "Create Candidate"
```

### Bulk Import Candidates
```
1. Go to /candidates
2. Click "Bulk Import"
3. Select CSV or Excel file
4. Check "Send Invitations" if needed
5. Click "Import"
6. Wait for completion
```

### Schedule Interview
```
1. Go to /interviews
2. Click "Schedule Interview"
3. Select candidate
4. Select interviewer (employee)
5. Select round type (SCREENING, TECHNICAL, etc.)
6. Pick date and time
7. Set duration (in minutes)
8. Click "Schedule"
```

### Conduct Interview
```
1. Go to /employee/interviews
2. Click on interview
3. Click "Start Interview"
4. Interview timer starts
5. Take notes if needed
6. Click "End Interview"
7. Fill scores (0-100 sliders)
8. Add evaluation notes
9. Click "Submit Evaluation"
```

## File Formats

### CSV Import Format
```csv
email,first_name,last_name,phone,domain,position,experience_years,qualifications
john@example.com,John,Doe,+1-555-0100,Backend,Senior Dev,5,Python Go Kubernetes
jane@example.com,Jane,Smith,+1-555-0101,Frontend,React Dev,3,React TypeScript
```

### Excel Import
Same columns as CSV, Excel file (.xlsx or .xls)

## Troubleshooting

### "Connection refused on localhost:8000"
- ✅ Backend not running
- ✅ Solution: Start backend server first

### "401 Unauthorized"
- ✅ Session expired
- ✅ Solution: Refresh page or login again

### "403 Forbidden"
- ✅ Insufficient permissions for this page
- ✅ Solution: Login with correct role

### "Cannot find module 'react'"
- ✅ Dependencies not installed
- ✅ Solution: Run `npm install`

### Form validation errors
- ✅ Check error messages for required fields
- ✅ Email must be valid format
- ✅ Passwords need 8+ chars with uppercase/lowercase/number/special char

## Performance Tips

- ✅ Interviews list is paginated (20 per page)
- ✅ Candidate list is searchable and filterable
- ✅ Use filters to reduce data loading
- ✅ Bulk import is async (check progress)

## Security Notes

- ✅ Access tokens stored in memory (cleared on refresh)
- ✅ Refresh tokens in HTTPOnly cookies
- ✅ Never share credentials
- ✅ Use HTTPS in production
- ✅ Backend validates all requests

## Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## Docker Deployment

```bash
# Build image
docker build -t ai-interviewer-frontend .

# Run container
docker run -p 3000:3000 ai-interviewer-frontend
```

## Need Help?

Check the following:
1. Backend is running on port 8000
2. Correct credentials for your role
3. Network connectivity to backend
4. Browser console for error messages
5. Network tab for failed API calls

---

**Status**: Ready for Testing
**Last Updated**: November 25, 2025
