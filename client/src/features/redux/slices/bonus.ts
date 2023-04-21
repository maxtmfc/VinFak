import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type  {UserBonusType }from "../../../types/bonusType"
import type { AppThunk } from '../store';

type InitialStateType = {
  users: UserBonusType[]
}

const initialState: InitialStateType = {
  users: []
};

const usersSlicer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // отображение всех дел
    setUsers: (state, action: PayloadAction<UserBonusType[]>)=>{
state.users= action.payload
    }, // копируем и изменяем state добовляем новое через action.payload
    // добавление дел

  },
});

export const {
  setUsers
} = usersSlicer.actions;

export const getUserThunk = (): AppThunk => (dispatch) => {
  axios<UserBonusType[]>('/bonus') // axios defaults baseUrl =?
    .then(({ data }) => dispatch(setUsers(data)))
    .catch(console.log);
};

export default usersSlicer.reducer 