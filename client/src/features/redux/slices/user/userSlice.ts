import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '../../../../types/user/userTypes';

// Define the initial state using that type
const initialState: UserType = {
  status: 'fetching',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserType,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => action.payload,
    logoutUser: (state) => ({ status: 'guest' }),
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
