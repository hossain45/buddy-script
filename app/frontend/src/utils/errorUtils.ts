/**
 * Error utility functions
 * Handles error message extraction from various error formats
 */

/**
 * Extracts error message from RTK Query or API error objects
 * @param error - Error object from API or RTK Query
 * @returns Error message string or undefined
 */
export const getErrorMessage = (error: unknown): string | undefined => {
  if (error && typeof error === "object" && "data" in error) {
    const errorData = error.data as {
      message?: string;
      error?: string;
      errors?: Record<string, string[]>;
    };
    if (errorData.errors) {
      // Handle validation errors
      const firstError = Object.values(errorData.errors)[0];
      return Array.isArray(firstError) ? firstError[0] : firstError;
    }
    return errorData.message || errorData.error;
  }
  if (error && typeof error === "object" && "error" in error) {
    return (error.error as string) || "An error occurred";
  }
  return undefined;
};
