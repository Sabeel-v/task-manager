import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast } from '../../redux/slices/uiSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state) => state.ui.toast);

  if (!isVisible) return null;

  const typeStyle = type === 'success' ? { background: 'var(--state-success)' }
                  : type === 'error' ? { background: 'var(--state-danger)' }
                  : { background: 'var(--text-secondary)' };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        ...typeStyle,
        color: 'white',
        padding: '16px 24px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        animation: 'slideUp 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
      }}
    >
      <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{message}</span>
      <button 
        onClick={() => dispatch(clearToast())}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px'
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
