/**
 * Production Configuration
 * All environment variables and configuration constants
 */

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),
  },
  
  auth: {
    accessTokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
    userKey: 'user',
    tokenRefreshThreshold: 5 * 60 * 1000, // 5 minutes before expiration
  },

  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },

  polling: {
    importJobInterval: 5000, // 5 seconds
    defaultRefetchInterval: 30000, // 30 seconds
  },

  validation: {
    minPasswordLength: 8,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },

  roles: {
    ADMIN: 'ADMIN',
    HR: 'HR',
    EMPLOYEE: 'EMPLOYEE',
    CANDIDATE: 'CANDIDATE',
  } as const,
};

export default config;
