'use client';

import React from 'react';

interface AuthButtonProps {
  isLoading: boolean;
  text: string;
}

const AuthButton = ({ isLoading, text }: AuthButtonProps) => (
  <button 
    type="submit" 
    className="btn btn-primary w-full mt-6 text-white font-bold" 
    disabled={isLoading}
  >
    {isLoading ? (
      <>
        <span className="loading loading-spinner loading-sm"></span>
        Зачекайте...
      </>
    ) : text}
  </button>
);

export default AuthButton;