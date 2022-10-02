import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './auth-provider.context';
import useLocalStorage from '../../hooks/use-local-storage';
import { setAuthToken } from '../../services/api-service';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      return;
    }
    setAuthToken(user.token);
  }, [user]);

  const signIn = async (data) => {
    setUser(data);
    navigate('/home');
  };

  const signOut = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const contextValue = useMemo(() => {
    return { user, signIn, signOut };
  }, [user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
