import { Box, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { Button } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../features/redux/hooks';
import { setEmail } from '../../features/redux/slices/remind/remindSlice';
import remindPassThunk from '../../features/redux/slices/remind/thunkRemind';
import type { LoginForm } from '../../types/user/formTypes';

export default function RemindPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("--------------------");
    const data = Object.fromEntries(new FormData(event.currentTarget)) as LoginForm;
    dispatch(remindPassThunk(data));
  // function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   const email = event.target.value;
  //   dispatch(setEmail(email));
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <TextField fullWidth label="Email Adress" name="email" id="email" required autoFocus />
        {/* <Button style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }} type="submit">
            Отправить
          </Button> */}
          <button style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }} type="submit">
            Отправить
          </button>
      </Box>
    </Container>
  );
}
