import React from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { LoginForm } from "../components/auth/LoginForm";
import { useLoginMutation } from "../store/api/authApi";
import loginImage from "../assets/images/login.png";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

export const Login: React.FC = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    try {
      const { user } = await login(data).unwrap();
      dispatch(setUser(user));
      navigate("/feed", { replace: true });
    } catch (err) {
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
