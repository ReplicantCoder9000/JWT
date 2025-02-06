import Auth from './auth';

const API_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends Omit<RequestInit, 'headers'> {
  requiresAuth?: boolean;
  headers?: Record<string, string>;
}

export const fetchWithAuth = async (url: string, options: RequestOptions = {}) => {
  const { requiresAuth = true, headers: customHeaders = {}, ...rest } = options;
  
  const headers: Record<string, string> = { ...customHeaders };

  // Add authorization header if required and user is logged in
  if (requiresAuth) {
    const token = Auth.getToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    headers.Authorization = `Bearer ${token}`;
  }

  // Add default headers
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';

  const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;

  const response = await fetch(fullUrl, {
    headers,
    ...rest,
  });

  // Handle token expiration
  if (response.status === 401) {
    Auth.logout(); // Token is invalid or expired
    throw new Error('Session expired. Please login again.');
  }

  // Handle other error responses
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

export const get = (url: string, options?: RequestOptions) => 
  fetchWithAuth(url, { ...options, method: 'GET' });

export const post = <T>(url: string, data: T, options?: RequestOptions) => 
  fetchWithAuth(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });

export const put = <T>(url: string, data: T, options?: RequestOptions) => 
  fetchWithAuth(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const del = (url: string, options?: RequestOptions) => 
  fetchWithAuth(url, { ...options, method: 'DELETE' });
