/**
 * Base API Configuration for RTK Query
 * Provides the base API setup with endpoints and configuration
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL =  'http://localhost:3333';

export interface BaseQueryError {
  status?: number;
  data?: {
    message?: string;
    error?: string;
    errors?: Record<string, string[]>;
  };
}

// Base API with default configuration
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', // Include cookies for session-based auth
    prepareHeaders: (headers) => {
      // Add any default headers here if needed
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Comment', 'Like'],
  endpoints: () => ({}),
});

