import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
    <input
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...props}
    />
    {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
  </div>
);

export default Input;
