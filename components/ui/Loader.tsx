'use client';

interface LoaderProps {
  variant?: 'spinner' | 'dots' | 'ring' | 'ball';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  centered?: boolean;
  className?: string;
  label?: string;
}

export default function Loader({ 
  variant = 'spinner', 
  size = 'lg', 
  centered = false, 
  className = '',
  label
}: LoaderProps) {
  
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <span className={`loading loading-${variant} loading-${size} text-primary ${className}`}></span>
      {label && <p className="text-gray-500 text-sm font-medium animate-pulse">{label}</p>}
    </div>
  );

  if (centered) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[200px] flex-1">
        {spinner}
      </div>
    );
  }

  return spinner;
}