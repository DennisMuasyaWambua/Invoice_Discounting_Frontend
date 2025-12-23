import { apiClient } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  mobile_number: string;
  password: string;
  password_confirm: string;
  role_name: 'supplier' | 'buyer' | 'financier';
  company_name: string;
  kra_pin?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    username: string;
    mobile_number: string;
    role: string;
    company_name: string;
  };
  token: string;
}

export interface UserProfile {
  id: number;
  email: string;
  username: string;
  mobile_number: string;
  role: string;
  company_name: string;
  kra_pin?: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/auth/login/', credentials);
    
    // Store token in localStorage
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  async register(data: RegisterRequest): Promise<{ message: string; user: UserProfile }> {
    const response = await apiClient.post<{ message: string; user: UserProfile }>(
      '/api/auth/register/', 
      data
    );
    return response;
  }

  async logout(): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>('/api/auth/logout/');
      return response;
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  getStoredUser(): UserProfile | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}

export const authService = new AuthService();