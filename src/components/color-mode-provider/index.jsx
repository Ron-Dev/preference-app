import { useMemo, useState } from 'react';
import { colorPalette } from '../../constants/color-palette';
import { ColorModeContext } from './color-mode-provider.context';

const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(colorPalette.BLUE);

  const contextValue = useMemo(() => {
    return { colorMode, setColorMode };
  }, [colorMode]);

  return <ColorModeContext.Provider value={contextValue}>{children}</ColorModeContext.Provider>;
};

export default ColorModeProvider;
