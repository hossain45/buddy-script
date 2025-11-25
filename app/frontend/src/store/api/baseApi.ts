/**
 * Base API Configuration for RTK Query
 * Provides the base API setup with endpoints and configuration
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = "https://buddy-script-production.up.railway.app/";

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
      // RTK Query automatically sets Content-Type for JSON bodies
      // and handles FormData correctly (leaves Content-Type unset for browser to set boundary)
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Comment', 'Like'],
  endpoints: () => ({}),
});

