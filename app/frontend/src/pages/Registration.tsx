/**
 * Registration Page Component
 * Responsibility: Registration page container with layout and form
 */

import React from 'react';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { RegistrationForm } from '../components/auth/RegistrationForm';
import type { CreateUserPayload } from '../types';

export const Registration: React.FC = () => {
  const handleRegistration = async (data: CreateUserPayload) => {
    console.log('Registration data:', data);
    // TODO: Implement API call
  };

  const handleLogin = () => {
    console.log('Login clicked');
    // TODO: Navigate to login page
  };

  return (
    <AuthLayout
      imageUrl="/images/registration.png"
      imageDarkUrl="/images/registration1.png"
      imageAlt="Registration"
      imagePosition="left"
    >
      <RegistrationForm
        onSubmit={handleRegistration}
        onLogin={handleLogin}
      />
    </AuthLayout>
  );
};
