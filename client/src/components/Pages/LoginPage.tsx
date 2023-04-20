import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch } from '../../features/redux/hooks';
import { loginUserThunk } from '../../features/redux/slices/user/thunkActions';
import type { LoginForm } from '../../types/formTypes';
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
    const data = new FormData(event.currentTarget);
    dispatch(loginUserThunk(Object.fromEntries(data) as LoginForm, navigate, setShow, setError));
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Вход
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Электронный адрес"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Запомнить меня"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#333277',
                  color: 'white',
                  display: 'block',
                  '&:hover': { background: '#8A25A0', color: 'white' },
                }}
              >
                Войти
              </Button>
              <Typography sx={{ color: 'gray', marginLeft: '10px' }}>
                Зарегистрируйтесь, если у вас нет аккаунта{' '}
              </Typography>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#6865FF',
                    color: '#white',
                    '&:hover': { background: '#DF67FE', color: 'white' },
                  }}
                >
                  Регистрация
                </Button>
              </Link>
              {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
      <Modal style={{ marginTop: '150px' }} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ОШИБКА</Modal.Title>
        </Modal.Header>
        <Modal.Body>{err}</Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
