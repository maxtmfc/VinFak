import axios from 'axios';
import type { LoginForm, SignUpForm } from '../../../../types/user/formTypes';
import type { UserFromBackend } from '../../../../types/user/userTypes';
import type { ThunkActionCreater } from '../../store';
import { logoutUser, setUser } from './userSlice';

export const signUpThunk: ThunkActionCreater<SignUpForm> = (formData) => (dispatch) => {
  axios
    .post<UserFromBackend>('/auth/signup', formData)
    .then(({ data }) => {dispatch(setUser({ ...data, status: 'logged' }))})
    .catch(console.log);
};

// export const loginUserThunk: ThunkActionCreater<LoginForm> = (formData) => async (dispatch) => {
//   try {
//     const response = await axios.post<UserFromBackend>('/auth/login', formData);
//     dispatch(setUser({ ...response.data, status: 'logged' }));
//   } catch (error) {
//     if (error.response && error.response.data) {
//       dispatch(loginUserFailure(error.response.data.message));
//     } else {
//       dispatch(loginUserFailure(error.message));
//     }
//   }
// };

export const loginUserThunk: ThunkActionCreater<LoginForm> = (formData) => (dispatch) => {
  axios
    .post<UserFromBackend>('/auth/login', formData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch(console.log)
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
