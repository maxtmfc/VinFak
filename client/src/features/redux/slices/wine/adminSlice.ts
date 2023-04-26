import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  AdminFormType,
  AdminFromBackend,
} from '../../../../types/wine/adminType';

type AdminState = {
  allAdmin: AdminFormType[],
  allUsers: AdminFromBackend[],
};

const initialState: AdminState = {
  allAdmin: [],
  allUsers: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<AdminFromBackend[]>) => {
      state.allUsers = action.payload;      
    },
    addNewAdmin: (state, action: PayloadAction<AdminFormType>) => {
      state.allAdmin.unshift(action.payload);
    },
  },
});

export const { setAllUsers, addNewAdmin } = adminSlice.actions;

export default adminSlice.reducer;
