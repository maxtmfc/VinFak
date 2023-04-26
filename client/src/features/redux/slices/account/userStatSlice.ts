import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserStatType } from '../../../../types/account/userStatTypes';

type UserStatState = {
  OneUserStat: UserStatType[];
};

const initialState: UserStatState = {
  OneUserStat: [],
};

export const userStatSlice = createSlice({
  name: 'userStat',
  initialState,
  reducers: {
    setOneUserStat: (state, action: PayloadAction<UserStatType[]>) => {
      state.OneUserStat = action.payload;
    },
  },
});

export const { setOneUserStat } = userStatSlice.actions;

export default userStatSlice.reducer;
