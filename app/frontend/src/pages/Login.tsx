/**
 * Login Page Component
 * Responsibility: Login page container with layout and form
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { LoginForm } from "../components/auth/LoginForm";
import { useLoginMutation } from "../store/api/authApi";
import { useAppSelector } from "../store/hooks";
import loginImage from "../assets/images/login.png";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect to feed if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    try {
      await login(data).unwrap();
      // Navigate to feed on successful login
      navigate("/feed", { replace: true });
    } catch (err) {
      // Error is handled by RTK Query and stored in Redux state
      console.error("Login failed:", err);
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // TODO: Implement forgot password flow
  };

  return (
    <AuthLayout
      imageUrl={loginImage}
      imageDarkUrl={loginImage}
      imageAlt="Login"
      imagePosition="left"
    >
      <LoginForm
        onSubmit={handleLogin}
        onForgotPassword={handleForgotPassword}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};
