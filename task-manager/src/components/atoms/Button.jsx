import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = 'btn';
  const variantClass = variant === 'text' ? 'btn-text' 
                     : variant === 'danger' ? 'btn-danger' 
                     : variant === 'secondary' ? 'btn-secondary'
                     : 'btn-primary';
                     
  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
