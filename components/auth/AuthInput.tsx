'use client';

import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AuthInput = ({ label, error, ...props }: AuthInputProps) => (
  <div className="form-control w-full mb-4">
    <label className="label py-1">
      <span className="label-text font-semibold text-gray-700">{label}</span>
    </label>
    <input 
      {...props} 
      className={`input input-bordered w-full bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-primary/20 ${
        error ? 'input-error' : 'border-gray-200'
      }`} 
    />
    {error && (
      <label className="label py-1">
        <span className="label-text-alt text-error">{error}</span>
      </label>
    )}
  </div>
);

export default AuthInput;