import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/templates/AuthLayout';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

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
    <AuthLayout title="Create Account" subtitle="Start organizing your life today">
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div style={{ marginBottom: '32px' }}>
          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <Button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
        Already have an account? <Link to="/login" className="text-gradient" style={{ fontWeight: '600' }}>Log in</Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;