import { ThemeProvider } from '@emotion/react';
import { DatePicker } from '@material-ui/pickers';
import { Button, DialogTitle, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import { useAppDispatch } from '../../features/redux/hooks';
import { signUpThunk } from '../../features/redux/slices/user/thunkActions';
import type { SignUpForm } from '../../types/user/formTypes';

export default function SignupPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as SignUpForm;
    dispatch(signUpThunk(data));

    // window.location = '/user';
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'bottom',
        }}
      >
        <DialogTitle>Sign Up</DialogTitle>
        <Box mb={2}>
          <TextField fullWidth label="Nickname" name="nickName" id="nickName" required autoFocus />
          <TextField
            fullWidth
            label="First name"
            name="firstName"
            id="firstName"
            required
            autoFocus
          />
          <TextField fullWidth label="Last name" name="lastName" id="lastName" required autoFocus />
          <TextField fullWidth label="Birthdate" name="birthDate" id="birthDate" required autoFocus />
          <TextField fullWidth label="Email Adress" name="email" id="email" required autoFocus />
          <TextField fullWidth label="Password" name="password" id="password" required autoFocus />
        </Box>
        <Button type="submit">Нажать</Button>
      </Box>
    </Container>
  );
}
