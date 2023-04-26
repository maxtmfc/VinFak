import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserForAccount } from '../../../../types/account/accountTypes';

type BestUsersState = {
    BestUsers: UserForAccount[];
  };
  
  const initialState: BestUsersState = {
    BestUsers: [],
  };

  export const bestUsersSlice = createSlice({
    name: 'bestUsers',
    initialState,
    reducers: {
      setBestUsers: (state, action: PayloadAction<UserForAccount[]>) => {
        state.BestUsers = action.payload;
      },
    },
  });
  
  export const { setBestUsers } = bestUsersSlice.actions;
  
  export default bestUsersSlice.reducer;