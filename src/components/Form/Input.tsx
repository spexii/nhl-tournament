import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`
        mt-1
        block
        w-full
        px-3
        py-2
        border
        border-gray-300
        rounded-md
        shadow-sm
        focus:outline-none
        focus:ring-indigo-500
        focus:border-indigo-500
        sm:text-sm
        text-black
      `}
    />
  );
};

export default Input;