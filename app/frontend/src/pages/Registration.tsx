/**
 * Registration Page Component
 * Responsibility: Registration page container with layout and form
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { RegistrationForm } from "../components/auth/RegistrationForm";
import { useRegisterMutation } from "../store/api/authApi";
import { useAppSelector } from "../store/hooks";
import registrationImage from "../assets/images/registration.png";
import registrationDarkImage from "../assets/images/registration1.png";

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect to feed if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegistration = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    try {
      // Remove confirmPassword before sending to API - backend doesn't need it
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = data;
      await register(registerData).unwrap();
      // Navigate to feed on successful registration
      navigate("/feed", { replace: true });
    } catch (err) {
      // Error is handled by RTK Query and stored in Redux state
      console.error("Registration failed:", err);
    }
  };

  return (
    <AuthLayout
      imageUrl={registrationImage}
      imageDarkUrl={registrationDarkImage}
      imageAlt="Registration"
      imagePosition="left"
    >
      <RegistrationForm onSubmit={handleRegistration} isLoading={isLoading} error={error} />
    </AuthLayout>
  );
};
