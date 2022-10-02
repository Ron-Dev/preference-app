import { Avatar, Button, TextField, Box, Typography, Container } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import apiService from '../../services/api-service';
import { useState } from 'react';

const defaultUserState = { userName: '', password: '' };

const SignInPage = () => {
  const [user, setUser] = useState(defaultUserState);

  const handleSubmit = (event) => {
    event.preventDefault();
    apiService
      .post('/')
      .then(() => {})
      .catch((error) => {
        handleInput({ target: { password: '' } });
        console.log(error);
      });
  };

  const handleInput = (event) => {
    setUser((prv) => ({ ...prv, [event.target.name]: event.target.value }));
  };

  return (
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="userName"
            autoComplete="email"
            autoFocus
            onChange={handleInput}
            value={user.userName}
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
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
