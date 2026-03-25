import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password }));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card glass-card">
        <h2 className="auth-title text-gradient">Create Account</h2>
        <p className="auth-subtitle">Start organizing your life today</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label className="input-label">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" className="text-gradient" style={{ fontWeight: '600' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;