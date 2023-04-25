import React, { useState } from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Modal from 'react-bootstrap/Modal';
import { Dialog, DialogActions, DialogContent, DialogTitle, Modal } from '@mui/material';
import { useAppDispatch } from '../../features/redux/hooks';
import { loginUserThunk } from '../../features/redux/slices/user/thunkActions';
import type { LoginForm } from '../../types/user/formTypes';
// import { checkAuthThunk, loginThunk } from '../../redux/slice/userSlice';
// import { UserLoginFormType } from '../../redux/types/reduxTypes';

const theme = createTheme();

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  const [err, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));

    dispatch(loginUserThunk(formData as LoginForm));
  };
  // return <h1>1</h1>;
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <Button onClick={handleShow}>Login</Button>
          <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Box mb={2}>
                  <TextField fullWidth label="Email" name="email" type="email" required autoFocus />
                </Box>
                <Box mb={2}>
                  <TextField fullWidth label="Password" name="password" type="password" required />
                </Box>
                {err && (
                  <Typography variant="subtitle2" sx={{ color: theme.palette.error.main }}>
                    {err}
                  </Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button type="submit">Submit</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </form>
          </Dialog>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
