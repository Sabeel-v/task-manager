import React from 'react';

const Input = ({ label, id, ...props }) => {
  const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="input-group">
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <input id={inputId} className="input-field" {...props} />
    </div>
  );
};

export default Input;
