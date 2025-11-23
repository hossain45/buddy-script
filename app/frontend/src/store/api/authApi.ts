/**
 * Authentication API endpoints
 * Handles login, registration, and logout operations
 */

import { baseApi } from './baseApi';
import type { User, LoginPayload, CreateUserPayload } from '../../types';

/**
 * Authentication API response types
 */
export interface LoginResponse {
  message: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

/**
 * Authentication API endpoints
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Login endpoint
     * POST /login
     */
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Registration endpoint
     * POST /register
     */
    register: builder.mutation<RegisterResponse, Omit<CreateUserPayload, 'confirmPassword'>>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        },
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Logout endpoint
     * POST /logout (protected)
     */
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;

