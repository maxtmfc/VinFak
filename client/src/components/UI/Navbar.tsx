import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { logoutThunk } from '../../features/redux/slices/user/thunkActions';

export default function Navbar(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();
  return (
    <Box className="nav" sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" style={{ backgroundColor: 'black', opacity: '0.8' }}>
        <Toolbar style={{ justifyContent: 'space-between', margin: 'auto 5rem' }}>
          <Button style={{ fontSize: '40px' }} component={Link} to="/" color="inherit">
            ВинФак
          </Button>
          <Button style={{ fontSize: '25px' }} component={Link} to="/bonus" color="inherit">
            Приëмная комиссия
          </Button>
          <Button style={{ fontSize: '25px' }} component={Link} to="/contacts" color="inherit">
            Контакты
          </Button>
          {user.status === 'guest' && (
            <>
              <Button style={{ fontSize: '25px' }} component={Link} to="/signup" color="inherit">
                Поступить
              </Button>
              <Button style={{ fontSize: '25px' }} component={Link} to="/login" color="inherit">
                Войти
              </Button>
            </>
          )}
          {user.status === 'logged' && (
            <Button style={{ fontSize: '25px' }} component={Link} to="/user" color="inherit">
              Зачëтка
            </Button>
          )}
          {user.status === 'logged' && user.admin === true && (
            <Button style={{ fontSize: '25px' }} component={Link} to="/admin" color="inherit">
              Администратор
            </Button>
          )}
          {user.status === 'logged' && (
            <Button style={{ fontSize: '25px' }} color="inherit" onClick={() => dispatch(logoutThunk())}>
              Выйти
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
