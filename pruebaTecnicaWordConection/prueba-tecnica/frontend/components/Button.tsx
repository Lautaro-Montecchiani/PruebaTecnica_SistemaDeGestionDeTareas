import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => (
  <button
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
    disabled={loading || props.disabled}
    {...props}
  >
    {loading ? 'Cargando...' : children}
  </button>
);

export default Button;
