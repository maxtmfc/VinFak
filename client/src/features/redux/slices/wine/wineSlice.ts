import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { StatFormType, WineWithCategory } from '../../../../types/wine/wineType';

type WineState = {
  allWine: WineWithCategory[];
  allStat: StatFormType[];
};

const initialState: WineState = {
  allWine: [],
  allStat: [],
};

export const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    setAllWine: (state, action: PayloadAction<WineWithCategory[]>) => {
      state.allWine = action.payload;
    },
    addNewRecord: (state, action: PayloadAction<WineWithCategory>) => {
      state.allStat.unshift(action.payload);
    },
    addWine: (state, action: PayloadAction<WineWithCategory>) => {
      console.log(action.payload, 'action.payload .=.=.=.=.');
      
      state.allWine.push(action.payload);
    },
    editWine: (state, action: PayloadAction<WineWithCategory>) => {
      const foundIndex = state.allWine.findIndex((wine) => wine.id === action.payload.id);
      state.allWine[foundIndex] = action.payload;
    },
    deleteWine: (state, action: PayloadAction<WineWithCategory['id']>) => {
      state.allWine = state.allWine.filter((el) => el.id !== action.payload);
    },
  },
});

export const { setAllWine, addWine, addNewRecord, editWine, deleteWine } = wineSlice.actions;

export default wineSlice.reducer;
