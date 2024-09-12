import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`
        w-full
        inline-flex
        justify-center
        py-2
        px-4
        border
        border-transparent
        shadow-sm
        text-sm
        font-medium
        rounded-md
        text-white
        bg-green-700
        hover:bg-green-800
        focus:outline-none
      `}
    />
  );
};

export default Button;