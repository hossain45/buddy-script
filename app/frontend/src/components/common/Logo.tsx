/**
 * Logo Component
 * Responsibility: Display application logo
 */

import React from 'react';
import logo from '../../assets/images/logo.svg';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: 'h-8',
  medium: 'h-12',
  large: 'h-16',
};

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'medium' }) => {
  return (
    <div className={`flex justify-center mb-8 ${className}`}>
      <img
        src={logo}
        alt="Buddy Script"
        className={`${sizeClasses[size]} w-auto`}
      />
    </div>
  );
};
