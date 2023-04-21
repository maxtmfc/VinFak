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
      state.allWine = action.payload;
    },
    addNewRecord: (state, action: PayloadAction<WineWithCategory>) => {
      state.allWine.unshift(action.payload);
    },
  },
});

export const { setAllWine, addNewRecord } = wineSlice.actions;

export default wineSlice.reducer;
