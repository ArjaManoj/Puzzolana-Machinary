import { AuthManager } from './auth';

/**
 * Resolves the API Base URL across environments:
 * 1. Server-side in Vercel with Service Binding: process.env.BACKEND_SERVICE_URL (injected at runtime by Vercel)
 * 2. Explicit Environment Variable: process.env.NEXT_PUBLIC_API_URL
 * 3. Client-side browser execution: '/api' (matching Vercel top-level rewrite /api/(.*) -> backend)
 * 4. Local Development Server fallback: 'http://localhost:5000/api'
 */
export const getApiBaseUrl = (): string => {
  // 1. Server-side runtime with Vercel service binding
  if (typeof window === 'undefined' && process.env.BACKEND_SERVICE_URL) {
    const base = process.env.BACKEND_SERVICE_URL.replace(/\/$/, '');
    return `${base}/api`;
  }
  // 2. Explicit NEXT_PUBLIC_API_URL if configured
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // 3. Client-side browser execution
  if (typeof window !== 'undefined') {
    return '/api';
  }
  // 4. Default fallback for local dev
  return 'http://localhost:5000/api';
};

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
  errors?: unknown;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const apiBase = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${apiBase}${cleanEndpoint}`;
  const authHeaders = typeof window !== 'undefined' ? AuthManager.getAuthHeaders() : {};
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      next: { revalidate: 60 },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
}

export const ApiClient = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};
