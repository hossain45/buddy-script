/**
 * LoginForm Component
 * Responsibility: Handle login form state and submission
 */

import React, { useState } from 'react';
import { FormInput } from '../common/FormInput';
import { SocialAuthButton } from '../common/SocialAuthButton';
import { Logo } from '../common/Logo';
import type { LoginPayload } from '../../types';

interface LoginFormProps {
  onSubmit: (data: LoginPayload) => Promise<void>;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
}) => {
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginPayload, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user types
    if (errors[name as keyof LoginPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoginPayload, string>> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.log(error);
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    console.log('Google authentication');
  };

  return (
    <div className="w-full">
      <Logo />

      <div className="text-center mb-8">
        <p className="text-gray-600 text-sm mb-2">Welcome back</p>
        <h4 className="text-2xl font-bold text-gray-900">
          Login to your account
        </h4>
      </div>

      <SocialAuthButton
        provider="google"
        text="Sign in with Google"
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
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700 cursor-pointer"
            >
              Remember me
            </label>
          </div>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login now'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSignUp}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Create New Account
          </button>
        </p>
      </div>
    </div>
  );
};
