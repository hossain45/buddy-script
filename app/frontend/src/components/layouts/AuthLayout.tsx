/**
 * AuthLayout Component
 * Responsibility: Provides layout structure for authentication pages (login/register)
 */

import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  imageUrl: string;
  imageDarkUrl?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  imageUrl,
  imageDarkUrl,
  imageAlt = "Authentication",
  imagePosition = "left",
}) => {
  const isImageLeft = imagePosition === "left";

  return (
    <section className="auth-container">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-400 rounded-full opacity-20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400 rounded-full opacity-10 blur-3xl" />

      <div className="container-custom relative z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-screen py-12 ${
            isImageLeft ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image Section */}
          <div className={`md:col-span-6 lg:col-span-7 ${!isImageLeft ? "md:order-2" : ""}`}>
            <div className="flex justify-center items-center">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="block dark:hidden max-w-full h-auto drop-shadow-2xl animate-fade-in"
              />
              {imageDarkUrl && (
                <img
                  src={imageDarkUrl}
                  alt={imageAlt}
                  className="hidden dark:block max-w-full h-auto drop-shadow-2xl"
                />
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className={`md:col-span-6 lg:col-span-5 ${!isImageLeft ? "md::order-1" : ""}`}>
            <div className="auth-card animate-slide-in ">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
