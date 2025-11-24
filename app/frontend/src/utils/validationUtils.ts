/**
 * Form validation utility functions
 * Handles form validation logic for authentication forms
 */

import type { CreateUserPayload, LoginPayload } from "../types";

/**
 * Validation errors type for registration form
 */
export type RegistrationFormErrors = Partial<
  Record<keyof CreateUserPayload | "terms", string>
>;

/**
 * Validation errors type for login form
 */
export type LoginFormErrors = Partial<Record<keyof LoginPayload, string>>;

/**
 * Validates registration form data
 * @param formData - Registration form data
 * @param agreeToTerms - Whether user agreed to terms
 * @returns Object with validation errors (empty if valid)
 */
export const validateRegistrationForm = (
  formData: CreateUserPayload,
  agreeToTerms: boolean
): RegistrationFormErrors => {
  const errors: RegistrationFormErrors = {};

  if (!formData.firstName) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!agreeToTerms) {
    errors.terms = "You must agree to the terms and conditions";
  }

  return errors;
};

/**
 * Validates login form data
 * @param formData - Login form data
 * @returns Object with validation errors (empty if valid)
 */
export const validateLoginForm = (formData: LoginPayload): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

