import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './auth-provider.context';
import useLocalStorage from '../../hooks/use-local-storage';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

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
