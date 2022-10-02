import { useContext } from 'react';
import { ColorModeContext } from '../../components/color-mode-provider/color-mode-provider.context';

const useColorModeContext = () => {
  return useContext(ColorModeContext);
};

export default useColorModeContext;
