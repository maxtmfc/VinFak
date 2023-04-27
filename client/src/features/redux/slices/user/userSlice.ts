import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '../../../../types/user/userTypes';

// Define the initial state using that type
const initialState: UserType = {
  status: 'fetching',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserType,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => action.payload,
    logoutUser: (state) => ({ ...state, status: 'guest' }),
    setError: (state, action: PayloadAction<string>) =>
      // console.log(action.payload, 'action.payload =======')
      ({ ...state, error: action.payload }),
  },
});

export const { setUser, logoutUser, setError } = userSlice.actions;

export default userSlice.reducer;
