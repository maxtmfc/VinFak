import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import  usersSlicer  from './slices/bonus';

// типизация
const rootReducer = combineReducers({
  users: usersSlicer,
})

export const store = configureStore({
  reducer: rootReducer
  },
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export type ThunkActionCreater<PayloadType = void, ReturnType = void> = (
  payload: PayloadType,
) => AppThunk<ReturnType>;
