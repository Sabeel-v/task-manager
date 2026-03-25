import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

// 1. Keep these imports
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// ❌ DELETE THESE LINES BELOW IF THEY ARE STILL THERE:
// const Login = () => <div>...</div>; 
// const Signup = () => <div>...</div>;

const AppRoutes = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      {/* 2. These will now use the imported components from your pages folder */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;