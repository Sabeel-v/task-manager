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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-indigo-600">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;