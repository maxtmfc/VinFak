import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { WineWithCategory } from '../../../../types/wine/wineType';

type WineState = {
    allWine: WineWithCategory[];
  };
  
  const initialState: WineState = {
    allWine: [],
  };

export const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    setAllWine: (state, action: PayloadAction<WineWithCategory[]>) => {
      console.log(action.payload, '======== из слайса');
      
      state.allWine = action.payload;
    },
    // addNewRecord: (state, action) => {

    // }
  },
});

export const { setAllWine } = wineSlice.actions;

export default wineSlice.reducer;
