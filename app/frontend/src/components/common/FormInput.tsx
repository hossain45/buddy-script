/**
 * FormInput Component
 * Responsibility: Reusable form input field with label and error handling
 */

import React from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  className = '',
  required = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'border-red-500 focus:ring-red-200' : ''}`}
        placeholder={placeholder}
        required={required}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};
