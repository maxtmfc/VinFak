import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserStatType } from '../../../../types/account/userStatTypes';

type UserStatState = {
  allUserStat: UserStatType[];
};

const initialState: UserStatState = {
  allUserStat: [],
};

export const userStatSlice = createSlice({
  name: 'userStat',
  initialState,
  reducers: {
    setAllUserStat: (state, action: PayloadAction<UserStatType[]>) => {
      state.allUserStat = action.payload;
    },
  },
});

export const { setAllUserStat } = userStatSlice.actions;

export default userStatSlice.reducer;
