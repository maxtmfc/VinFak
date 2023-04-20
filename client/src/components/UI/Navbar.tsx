import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar(): JSX.Element {
  return (
    <Box className="nav" sx={{ flexGrow: 1 }}>
      <AppBar className="navbar" style={{ backgroundColor: 'black', opacity: "0.8" }}>
        <Toolbar style={{ justifyContent: 'space-between', margin: 'auto 5rem' }}>
          <Button component={Link} to="/" color="inherit">
            ВинФак
          </Button>
          <Button component={Link} to="/bonus" color="inherit">
            Приемная комиссия
          </Button>
          <Button component={Link} to="/signup" color="inherit">
            Поступить
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Войти
          </Button>
          <Button component={Link} to="/user" color="inherit">
            Зачëтка
          </Button>
          <Button component={Link} to="/admin" color="inherit">
            Администратор
          </Button>
          <Button component={Link} to="/logout" color="inherit">
            Выйти
          </Button>
          <Button component={Link} to="/contacts" color="inherit">
            Контакты
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
