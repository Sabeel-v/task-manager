import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { setUser, setLoading } from './redux/slices/authSlice';
import AppRoutes from './routes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;