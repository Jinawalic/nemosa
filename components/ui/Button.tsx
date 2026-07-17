import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-6 py-2.5 font-medium rounded-full shadow-sm transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base';
  
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md',
    secondary: 'bg-white text-emerald-700 hover:bg-emerald-50 hover:shadow-md',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};