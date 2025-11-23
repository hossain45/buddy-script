/**
 * SocialAuthButton Component
 * Responsibility: Social authentication button (Google, etc.)
 */

import React from 'react';
import googleIcon from '../../assets/images/google.svg';

interface SocialAuthButtonProps {
  provider: 'google' | 'facebook' | 'twitter';
  text: string;
  onClick: () => void;
  className?: string;
}

const providerIcons: Record<string, string> = {
  google: googleIcon,
};

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  text,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      className={`btn-social ${className}`}
      onClick={onClick}
    >
      <img src={providerIcons[provider]} alt={provider} className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </button>
  );
};
