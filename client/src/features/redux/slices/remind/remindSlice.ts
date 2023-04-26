import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { LoginForm } from '../../../../types/user/formTypes';

const initialState: LoginForm = {
    email: '',
  };

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<LoginForm>) => action.payload,
  },
});

export const { setEmail } = emailSlice.actions;

export default emailSlice.reducer;
