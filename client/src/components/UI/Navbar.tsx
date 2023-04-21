import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar(): JSX.Element {
  return (
    <Box className="nav" sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" style={{ backgroundColor: 'black', opacity: '0.8' }}>
        <Toolbar style={{ justifyContent: 'space-between', margin: 'auto 5rem' }}>
          <Button style={{ fontSize: '35px' }} component={Link} to="/" color="inherit">
            ВинФак
          </Button>
          <Button style={{ fontSize: '20px' }} component={Link} to="/bonus" color="inherit">
            Приëмная комиссия
          </Button>
          <Button style={{ fontSize: '20px' }} component={Link} to="/signup" color="inherit">
            Поступить
          </Button>
          <Button style={{ fontSize: '20px' }} component={Link} to="/login" color="inherit">
            Войти
          </Button>
          <Button style={{ fontSize: '20px' }} component={Link} to="/user" color="inherit">
            Зачëтка
          </Button>
          <Button style={{ fontSize: '20px' }} component={Link} to="/admin" color="inherit">
            Администратор
          </Button>
          <Button style={{ fontSize: '20px' }} component={Link} to="/logout" color="inherit">
            Выйти
          </Button>
          <Button style={{ fontSize: '20px' }} component={Link} to="/contacts" color="inherit">
            Контакты
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
