import { MenuItem, TextField, Box, AppBar } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { colorPaletteOptions } from '../../constants/color-palette';
import useColorModeContext from '../../hooks/use-color-mode-context';
import apiService from '../../services/api-service';

const HomePage = () => {
  const { colorMode, setColorMode } = useColorModeContext();

  const onPrimaryColorChange = useCallback(
    (event) => () => {
      apiService.post('/').then(() => {
        setColorMode(event.target.value);
      });
    },
    []
  );

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
      </Box>
    </AppBar>
  );
};

export default HomePage;
