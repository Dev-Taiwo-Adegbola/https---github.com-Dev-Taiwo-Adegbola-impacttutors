import { cookies } from "next/headers";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

type FetchOptions = RequestInit & {
  params?: Record<string, string | number>;
  token?: string;
};

async function betterFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, token, ...init } = options;
  
  let url = `${API_BASE_URL}${endpoint}`;
  if (!url.endsWith('/') && !url.includes('?')) {
    url += '/';
  }
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.detail || 'API request failed');
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) => 
    betterFetch<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
    betterFetch<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  
  put: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
    betterFetch<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  
  patch: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
    betterFetch<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  
  delete: <T>(endpoint: string, options?: FetchOptions) => 
    betterFetch<T>(endpoint, { ...options, method: 'DELETE' }),

  // Helper for server components
  auth: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    return {
      get: <T>(endpoint: string, options?: FetchOptions) => 
        betterFetch<T>(endpoint, { ...options, token, method: 'GET' }),
      post: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
        betterFetch<T>(endpoint, { ...options, token, method: 'POST', body: JSON.stringify(body) }),
      put: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
        betterFetch<T>(endpoint, { ...options, token, method: 'PUT', body: JSON.stringify(body) }),
      patch: <T>(endpoint: string, body?: any, options?: FetchOptions) => 
        betterFetch<T>(endpoint, { ...options, token, method: 'PATCH', body: JSON.stringify(body) }),
      delete: <T>(endpoint: string, options?: FetchOptions) => 
        betterFetch<T>(endpoint, { ...options, token, method: 'DELETE' }),
    };
  }
};
