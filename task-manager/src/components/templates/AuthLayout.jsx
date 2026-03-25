import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card glass-card">
        {title && <h2 className="auth-title text-gradient">{title}</h2>}
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
