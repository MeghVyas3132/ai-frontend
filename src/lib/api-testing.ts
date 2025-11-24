/**
 * API Testing & Debugging Utilities
 * Use these utilities for testing API integration
 */

import apiClient from './api-client';
import { toast } from 'sonner';

interface ApiTestResult {
  success: boolean;
  method: string;
  endpoint: string;
  status?: number;
  data?: any;
  error?: string;
  duration: number;
}

/**
 * Test single endpoint
 */
export async function testEndpoint(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  endpoint: string,
  data?: any
): Promise<ApiTestResult> {
  const startTime = performance.now();

  try {
    const config: any = { method, url: endpoint };
    if (data) config.data = data;

    const response = await apiClient(config);
    const duration = performance.now() - startTime;

    return {
      success: true,
      method,
      endpoint,
      status: response.status,
      data: response.data,
      duration,
    };
  } catch (error: any) {
    const duration = performance.now() - startTime;

    return {
      success: false,
      method,
      endpoint,
      status: error.response?.status,
      error: error.message,
      duration,
    };
  }
}

/**
 * Test all critical endpoints
 */
export async function runHealthCheck(): Promise<{
  passed: number;
  failed: number;
  results: ApiTestResult[];
}> {
  const endpoints = [
    { method: 'GET' as const, endpoint: '/auth/logout', name: 'Auth Check' },
    { method: 'GET' as const, endpoint: '/users', name: 'Users List' },
    { method: 'GET' as const, endpoint: '/candidates', name: 'Candidates List' },
    { method: 'GET' as const, endpoint: '/interview-rounds', name: 'Interviews List' },
    { method: 'GET' as const, endpoint: '/candidates/dashboard/stats', name: 'Dashboard Stats' },
  ];

  const results: ApiTestResult[] = [];
  let passed = 0;
  let failed = 0;

  console.log('🔍 Running health check...');

  for (const { method, endpoint, name } of endpoints) {
    const result = await testEndpoint(method, endpoint);
    results.push(result);

    if (result.success) {
      console.log(`✅ ${name} - ${result.duration.toFixed(2)}ms`);
      passed++;
    } else {
      console.error(`❌ ${name} - ${result.error}`);
      failed++;
    }
  }

  console.log(`\n📊 Health Check Complete: ${passed} passed, ${failed} failed`);

  return { passed, failed, results };
}

/**
 * Log API response details
 */
export function logApiResponse(result: ApiTestResult) {
  const color = result.success ? 'color: green' : 'color: red';
  console.log(
    `%c${result.method} ${result.endpoint} - ${result.status || 'Error'}`,
    color
  );
  console.log('Duration:', `${result.duration.toFixed(2)}ms`);
  console.log('Response:', result.data || result.error);
}

/**
 * Export API test results as JSON
 */
export function exportTestResults(results: ApiTestResult[]) {
  const json = JSON.stringify(results, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `api-test-results-${new Date().toISOString()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Manual API testing function for console
 * Usage: window.testApi()
 */
export async function interactiveApiTest() {
  console.log('%c🚀 API Testing Console', 'font-size: 16px; font-weight: bold');
  console.log(`
    Available commands:
    - testApi.health() - Run health check
    - testApi.test('GET', '/endpoint') - Test single endpoint
    - testApi.login({email, password}) - Test login
    - testApi.getUsers() - Get all users
    - testApi.getCandidates() - Get all candidates
  `);

  return {
    health: runHealthCheck,
    test: testEndpoint,
    login: (credentials: { email: string; password: string }) =>
      testEndpoint('POST', '/auth/login', credentials),
    getUsers: () => testEndpoint('GET', '/users'),
    getCandidates: () => testEndpoint('GET', '/candidates'),
    getUpcomingInterviews: () => testEndpoint('GET', '/interview-rounds/company/upcoming'),
    getDashboardStats: () => testEndpoint('GET', '/candidates/dashboard/stats'),
  };
}

/**
 * Initialize testing console on window
 */
export function initializeTestingConsole() {
  if (typeof window !== 'undefined') {
    (window as any).testApi = interactiveApiTest();
    console.log('%c✅ API Testing Console Ready', 'color: green; font-weight: bold');
    console.log('Type: testApi.[command]() to test endpoints');
  }
}

export default {
  testEndpoint,
  runHealthCheck,
  logApiResponse,
  exportTestResults,
  interactiveApiTest,
  initializeTestingConsole,
};
