/**
 * RegistrationForm Component
 * Responsibility: Handle registration form state and submission
 */

import React, { useState } from "react";
import { FormInput } from "../common/FormInput";
import { SocialAuthButton } from "../common/SocialAuthButton";
import { Logo } from "../common/Logo";
import type { CreateUserPayload } from "../../types";
import { useNavigate } from "react-router";
import { getErrorMessage } from "../../utils/errorUtils";
import { validateRegistrationForm, type RegistrationFormErrors } from "../../utils/validationUtils";

interface RegistrationFormProps {
  onSubmit: (data: CreateUserPayload) => Promise<void>;
  isLoading?: boolean;
  error?: unknown;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  isLoading: externalLoading,
  error: externalError,
}) => {
  const [formData, setFormData] = useState<CreateUserPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorMessage = externalError ? getErrorMessage(externalError) : undefined;
  const isFormLoading = externalLoading || isSubmitting;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof CreateUserPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = validateRegistrationForm(formData, agreeToTerms);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Clear errors on success
      setErrors({});
    } catch (error) {
      console.log(error);
      const errorMsg = getErrorMessage(error);
      setErrors({ email: errorMsg || "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show external error if present
  const displayError = errorMessage;

  const handleGoogleAuth = () => {
    console.log("Google registration");
  };

  return (
    <div className="w-full">
      <Logo />

      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-2">Get Started Now</p>
        <h4 className="text-2xl font-bold text-gray-900">Create your account</h4>
      </div>

      <SocialAuthButton
        provider="google"
        text="Register with Google"
        onClick={handleGoogleAuth}
        className="mb-6"
      />

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            placeholder="John"
            required
          />

          <FormInput
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Doe"
            required
          />
        </div>

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password"
          required
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          required
        />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => {
                setAgreeToTerms(e.target.checked);
                if (e.target.checked && errors.terms) {
                  setErrors((prev) => ({ ...prev, terms: undefined }));
                }
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
          </div>
          <div className="ml-2">
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700 cursor-pointer">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                terms and conditions
              </a>
            </label>
            {errors.terms && <div className="form-error mt-1">{errors.terms}</div>}
          </div>
        </div>

        {displayError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{displayError}</p>
          </div>
        )}

        <button type="submit" className="btn-primary w-full mt-6" disabled={isFormLoading}>
          {isFormLoading ? "Creating account..." : "Register now"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
