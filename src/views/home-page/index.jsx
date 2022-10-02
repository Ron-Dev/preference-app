import { MenuItem, TextField, Box, AppBar, IconButton } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { colorPaletteOptions } from '../../constants/color-palette';
import useColorModeContext from '../../hooks/use-color-mode-context';
import { updatePreferredColor } from '../../services/api-service';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuthContext from '../../hooks/use-auth-context';

const HomePage = () => {
  const { colorMode, setColorMode } = useColorModeContext();
  const { user, signOut } = useAuthContext();

  useEffect(() => {
    if (!user.preferredColor) {
      return;
    }
    setColorMode(user.preferredColor);
  }, [user]);

  const onPrimaryColorChange = useCallback((event) => {
    const colorValue = event.target.value;
    updatePreferredColor({ preferredColor: colorValue })
      .then(() => {
        setColorMode(colorValue);
      })
      .catch(() => {});
  }, []);

  const colorOptions = useMemo(
    () =>
      colorPaletteOptions.map((ele) => {
        return (
          <MenuItem key={ele.value} value={ele.value}>
            {ele.label}
          </MenuItem>
        );
      }),
    [colorPaletteOptions]
  );

  return (
    <AppBar color="default" position="sticky">
      <Box m={2}>
        <TextField
          select
          sx={{ width: 100 }}
          label="Primary color"
          value={colorMode}
          onChange={onPrimaryColorChange}>
          {colorOptions}
        </TextField>
        <IconButton aria-label="logout" color="primary" onClick={signOut}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </AppBar>
  );
};

export default HomePage;
