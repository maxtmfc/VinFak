import axios from 'axios';
import type { LoginForm, SignUpForm } from '../../../../types/user/formTypes';
import type { UserFromBackend } from '../../../../types/user/userTypes';
import type { ThunkActionCreater } from '../../store';
import { logoutUser, setError, setUser } from './userSlice';

export const signUpThunk: ThunkActionCreater<SignUpForm> = (formData) => (dispatch) => {
  axios
    .post<UserFromBackend>('/auth/signup', formData)
    .then(({ data }) => {
      dispatch(setUser({ ...data, status: 'logged' }));
    })
    .catch(console.log);
};

export const loginUserThunk: ThunkActionCreater<LoginForm> = (formData) => (dispatch) => {
  axios
    .post<UserFromBackend>('/auth/login', formData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((error) => {
      dispatch(setError(error.response.data.message));
      dispatch(setUser({ status: 'guest', error: error.response.data.message }));
    });
};

export const checkUserThunk: ThunkActionCreater = () => (dispatch) => {
  axios
    .get<UserFromBackend>('/auth/check')
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch(() => dispatch(logoutUser()));
};

export const logoutThunk: ThunkActionCreater = () => (dispatch) => {
  axios
    .get('/auth/logout')
    .then(() => dispatch(logoutUser()))
    .catch(console.log);
};
