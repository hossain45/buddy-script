/**
 * Login Page Component
 * Responsibility: Login page container with layout and form
 */

import React from 'react';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';
import type { LoginPayload } from '../types';

export const Login: React.FC = () => {
  const handleLogin = async (data: LoginPayload) => {
    console.log('Login data:', data);
    // TODO: Implement API call
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // TODO: Implement forgot password flow
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
    // TODO: Navigate to registration page
  };

  return (
    <AuthLayout
      imageUrl="/images/login.png"
      imageAlt="Login"
      imagePosition="left"
    >
      <LoginForm
        onSubmit={handleLogin}
        onForgotPassword={handleForgotPassword}
        onSignUp={handleSignUp}
      />
    </AuthLayout>
  );
};
