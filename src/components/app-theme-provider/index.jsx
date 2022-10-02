import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import useColorModeContext from '../../hooks/use-color-mode-context';

const AppThemeProvider = ({ children }) => {
  const { colorMode } = useColorModeContext();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: colorMode }
        }
      }),
    [colorMode]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
