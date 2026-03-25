import React from 'react';

const DashboardLayout = ({ children, headerTitle, onSignOut }) => {
  return (
    <div className="dashboard-layout">
      <header className="container dashboard-header">
        <h1 className="dashboard-title text-gradient">{headerTitle}</h1>
        <button onClick={onSignOut} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
          Sign Out
        </button>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;
