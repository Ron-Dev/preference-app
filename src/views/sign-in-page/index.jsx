import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Alert,
  Collapse
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { login } from '../../services/api-service';
import { useState } from 'react';
import useAuthContext from '../../hooks/use-auth-context';

const defaultUserState = { email: '', password: '' };
const defaultAlertObj = { isOpen: false, type: '', message: '' };

const SignInPage = () => {
  const [user, setUser] = useState(defaultUserState);
  const [alertObj, setAlertObj] = useState(defaultAlertObj);
  const { signIn } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user.email || !user.password) {
      return setAlertObj({ isOpen: true, type: 'error', message: 'email or password is empty' });
    }

    login(user)
      .then((response) => {
        signIn(response.data);
      })
      .catch((error) => {
        console.log(error);
        setAlertObj({ isOpen: true, type: 'error', message: error.response.data });
      });
  };

  const handleInput = (event) => {
    setUser((prv) => ({ ...prv, [event.target.name]: event.target.value }));
  };

  const handleAlertClose = () => {
    setAlertObj({ isOpen: false });
  };

  return (
    <>
      <Collapse in={alertObj.isOpen}>
        <Alert color={alertObj.type} onClose={handleAlertClose}>
          {alertObj.message}
        </Alert>
      </Collapse>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInput}
              value={user.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleInput}
              value={user.password}
            />
            <Button onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignInPage;
