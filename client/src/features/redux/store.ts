import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import wineReducer from './slices/wine/wineSlice';
import adminReducer from './slices/wine/adminSlice';

import userReducer from './slices/user/userSlice';
import accountReducer from './slices/account/accountSlice'

export const store = configureStore({
  reducer: {
    setUserAccount: accountReducer,
    editAccount: accountReducer,
    deleteAccount: accountReducer,
    changeStatus: accountReducer,
    wine: wineReducer,
    admin: adminReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export type ThunkActionCreater<PayloadType = void, ReturnType = void> = (
  payload: PayloadType,
) => AppThunk<ReturnType>;
