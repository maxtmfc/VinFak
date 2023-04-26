import { Box, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useAppDispatch } from '../../features/redux/hooks';
import { setEmail } from '../../features/redux/slices/remind/remindSlice';
import type { LoginForm } from '../../types/user/formTypes';

export default function RemindPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as LoginForm;
    dispatch(setEmail(data));
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <TextField fullWidth label="Email Adress" name="email" id="email" required autoFocus />
      </Box>
    </Container>
  );
}
