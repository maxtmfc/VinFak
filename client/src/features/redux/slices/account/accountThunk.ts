import axios from 'axios';
import type { AppThunk, ThunkActionCreater } from '../../store';
import { setUserAccount, editAccount, changeStatus, deleteAccount } from './accountSlice';
import type {
  UserForAccount,
  AccountFormType,
  ChangeStatusFormType,
} from '../../../../types/account/accountTypes';
import { logoutUser } from '../user/userSlice';

// eslint-disable-next-line import/prefer-default-export
export const loadAccountsThunk: ThunkActionCreater = () => (dispatch) => {
  axios('http://localhost:3001/account')
    .then(({ data }) => dispatch(setUserAccount(data)))
    .catch(console.log);
};

export const editAccountThunk =
  (id: number, inputs: AccountFormType): AppThunk =>
  (dispatch) => {
    for (const prop in inputs) {
      if (inputs[prop] === '') {
        delete inputs[prop];
      }
    }
    axios
      .patch<UserForAccount>(`http://localhost:3001/account/${id}`, inputs)
      .then(({ data }) => dispatch(editAccount(data)))
      .catch(console.log);
  };

export const deleteAccountThunk =
  (id: number): AppThunk =>
  (dispatch) => {
    axios
      .delete<UserForAccount>(`http://localhost:3001/account/${id}`)
      .then(() => dispatch(deleteAccount()))
      .then(() => dispatch(logoutUser()))
      .catch(console.log);
  };

export const changeStatusThunk =
  (id: number, data: ChangeStatusFormType): AppThunk =>
  (dispatch) => {
    axios
      .patch<UserForAccount>(`http://localhost:3001/account/changestatus/${id}`, data)
      .then(({ data }) => dispatch(changeStatus(data)))
      .catch(console.log);
  };
