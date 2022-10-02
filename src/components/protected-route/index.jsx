import { Navigate } from 'react-router-dom';
import useAuthContext from '../../hooks/use-color-mode-context';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
