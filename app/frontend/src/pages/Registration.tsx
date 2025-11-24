import React from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { RegistrationForm } from "../components/auth/RegistrationForm";
import { useRegisterMutation } from "../store/api/authApi";
import registrationImage from "../assets/images/registration.png";
import registrationDarkImage from "../assets/images/registration1.png";
import { setUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

export const Registration: React.FC = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const { user } = await register(registerData).unwrap();
      dispatch(setUser(user));
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
