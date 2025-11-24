# Docker Setup Guide

## Prerequisites
- Docker installed and running
- Docker Compose installed

## Running the Frontend

### Production Mode
Build and run the production image:

```bash
docker-compose up --build
```

The application will be available at: http://localhost:3000

### Development Mode (with hot reload)
Run with live code reloading:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

The application will be available at: http://localhost:3000 with hot reload enabled.

## Docker Commands

### View logs
```bash
# Production
docker-compose logs -f frontend

# Development
docker-compose -f docker-compose.dev.yml logs -f frontend-dev
```

### Stop the container
```bash
# Production
docker-compose down

# Development
docker-compose -f docker-compose.dev.yml down
```

### Rebuild without cache
```bash
# Production
docker-compose up --build --no-cache

# Development
docker-compose -f docker-compose.dev.yml up --build --no-cache
```

### Access container shell
```bash
# Production
docker exec -it ai-interviewer-frontend sh

# Development
docker exec -it ai-interviewer-frontend-dev sh
```

## Environment Variables

The following environment variables are configured:

- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1` - Backend API URL
- `NEXT_PUBLIC_API_TIMEOUT=30000` - API timeout in milliseconds
- `NODE_ENV=production|development` - Environment mode

To modify these, update the `docker-compose.yml` or `docker-compose.dev.yml` file.

## Backend Connection

Make sure your backend is running on `http://localhost:8000` before starting the frontend.

If the backend is on a different host/port, update `NEXT_PUBLIC_API_BASE_URL` in the docker-compose files.

## Troubleshooting

### Port 3000 already in use
Change the port mapping in docker-compose.yml:
```yaml
ports:
  - "3001:3000"  # Use 3001 instead
```

### Backend connection refused
1. Verify backend is running: `curl http://localhost:8000`
2. Check backend URL in docker-compose environment
3. Ensure both containers are on the same network (ai-network)

### Out of memory
Increase Docker memory allocation in Docker Desktop settings.

### Clear everything and start fresh
```bash
docker-compose down -v  # Remove volumes
docker system prune -a  # Clean up unused images
docker-compose up --build
```

## Demo Credentials

Login with these credentials:

| Role     | Email                    | Password      |
|----------|--------------------------|---------------|
| Admin    | admin@aiinterviewer.com  | AdminPass123!@ |
| HR       | hr@testcorp.com          | HRPass123!@   |
| Employee | john@testcorp.com        | EmpPass123!@  |
