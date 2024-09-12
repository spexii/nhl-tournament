import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = (props) => {
  return (
    <label
      {...props}
      className={`
        block
        text-sm
        font-medium
        text-gray-700
      `}
    />
  );
};

export default Label;