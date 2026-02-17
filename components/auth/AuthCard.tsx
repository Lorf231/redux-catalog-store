'use client';

import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthCard = ({ children, title, subtitle }: AuthCardProps) => (
  <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-10">
    <div className="card w-full max-w-md bg-white shadow-xl border border-gray-100">
      <div className="card-body p-8">
        <h2 className="card-title justify-center text-3xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-gray-500 mb-8 text-sm">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  </div>
);

export default AuthCard;