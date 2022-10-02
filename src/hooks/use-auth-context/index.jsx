import { useContext } from 'react';
import { AuthContext } from '../../components/auth-provider/auth-provider.context';

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
