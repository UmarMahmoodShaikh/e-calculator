import React from 'react';

interface DisplayProps {
  value: string;
  error: string | null;
}

const Display: React.FC<DisplayProps> = ({ value, error }) => (
  <div className="bg-gray-100 p-4 rounded-xl mb-4">
    <div className="text-right text-3xl font-bold text-gray-800 h-12 overflow-hidden">
      {value}
    </div>
    {error && (
      <div className="text-right text-red-500 text-sm mt-1">{error}</div>
    )}
  </div>
);