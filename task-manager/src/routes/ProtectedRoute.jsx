import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>; // Replace with a Spinner Atom later
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;