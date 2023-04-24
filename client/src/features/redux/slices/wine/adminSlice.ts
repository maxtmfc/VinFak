import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AdminFormType, ArrAdminFormType, AdminFromBackend } from '../../../../types/wine/adminType';

const initialState: ArrAdminFormType = {
  allAdmin: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // setAdmins: (state, action: PayloadAction<AdminFromBackend[]>) => {
    //   state.allAdmin = action.payload;
    // },
    addNewAdmin: (state, action: PayloadAction<AdminFormType>) => {
      state.allAdmin.unshift(action.payload);
    },
  },
});

export const { addNewAdmin } = adminSlice.actions;

export default adminSlice.reducer;
