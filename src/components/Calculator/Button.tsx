import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, icon: Icon, children }) => (
  <button
    onClick={onClick}
    className={className}
  >
    {Icon ? <Icon className="w-6 h-6" /> : children}
  </button>
);