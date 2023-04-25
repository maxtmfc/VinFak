import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserForAccount } from '../../../../types/account/accountTypes';

const initialState = {
  userAccount: {
    id: 0,
    nickName: '',
    firstName: '',
    lastName: '',
    email: '',
    statusId: 0,
    admin: false,
    Status: {
      title: '',
    },
    Stats: [
      {
        userId: 0,
        wineId: 0,
        count: 0,
        createdAt: '',
        updatedAt: '',
      },
    ],
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserAccount: (state, action: PayloadAction<UserForAccount>) => {
      state.userAccount = { ...action.payload };
    },
    editAccount: (state, action: PayloadAction<UserForAccount>) => {
      state.userAccount = { ...state.userAccount, ...action.payload };
    },
    deleteAccount: (state) => {
      state.userAccount = initialState.userAccount;
    },
    changeStatus: (state, action: PayloadAction<UserForAccount>) => {
      state.userAccount = { ...state.userAccount, ...action.payload };
    },
  },
});

export const { setUserAccount, editAccount, deleteAccount, changeStatus } = accountSlice.actions;

export default accountSlice.reducer;
