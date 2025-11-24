/**
 * Type Utilities and Guards
 * Provides type-safe operations across the application
 */

import { User } from '@/contexts/AuthContext';
import { UserRole } from '@/contexts/AuthContext';

/**
 * Role-based permission checks
 */
export const rolePermissions = {
  ADMIN: ['create_users', 'delete_users', 'view_all_candidates', 'view_analytics', 'manage_company'],
  HR: ['create_candidates', 'schedule_interviews', 'view_candidates', 'view_analytics', 'send_emails'],
  EMPLOYEE: ['view_candidates', 'participate_interviews'],
  CANDIDATE: ['view_own_interviews', 'submit_responses'],
} as const;

/**
 * Check if user has permission
 */
export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false;
  const permissions = rolePermissions[user.role] || [];
  return (permissions as readonly string[]).includes(permission);
}

/**
 * Check if user has any of the specified roles
 */
export function hasRole(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

/**
 * Type guard for User
 */
export function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'email' in value &&
    'role' in value
  );
}

/**
 * Type guard for UserRole
 */
export function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === 'string' &&
    ['ADMIN', 'HR', 'EMPLOYEE', 'CANDIDATE'].includes(value)
  );
}

/**
 * Parse JWT payload without verification (client-side only)
 */
export function decodeJWT(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Check if JWT is expired
 */
export function isJWTExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  const expirationTime = payload.exp * 1000; // Convert to milliseconds
  return Date.now() >= expirationTime;
}

/**
 * Get time until JWT expires
 */
export function getJWTExpiresIn(token: string): number | null {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return null;

  const expirationTime = payload.exp * 1000;
  return Math.max(0, expirationTime - Date.now());
}

/**
 * Safe JSON parse
 */
export function safeJSONParse<T>(value: unknown, defaultValue: T): T {
  try {
    return typeof value === 'string' ? JSON.parse(value) : (value as T);
  } catch {
    return defaultValue;
  }
}

/**
 * Format API error message
 */
export function formatErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;

  if (error instanceof Error) return error.message;

  if (typeof error === 'object' && error !== null) {
    if ('detail' in error) return String((error as any).detail);
    if ('message' in error) return String((error as any).message);
  }

  return 'An error occurred';
}

/**
 * Check if two dates are on the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Format date to ISO string (for API)
 */
export function toISOString(date: Date): string {
  return date.toISOString();
}

/**
 * Parse ISO string to Date
 */
export function fromISOString(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Retry async function with exponential backoff
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
    }
  }
  throw new Error('Max attempts reached');
}

export default {
  hasPermission,
  hasRole,
  isUser,
  isUserRole,
  decodeJWT,
  isJWTExpired,
  getJWTExpiresIn,
  safeJSONParse,
  formatErrorMessage,
  isSameDay,
  toISOString,
  fromISOString,
  debounce,
  throttle,
  retryAsync,
};
