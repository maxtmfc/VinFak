import axios from 'axios';
import type { LoginForm } from '../../../../types/user/formTypes';
import type { ThunkActionCreater } from '../../store';
import { setEmail } from './remindSlice';

const remindPassThunk: ThunkActionCreater<LoginForm> = (formData) => (dispatch) => {
  axios
    .post<LoginForm>('/auth/login/forget', formData)
    .then(({ data }) => dispatch(setEmail({ ...data })))
    .catch(console.log);
};

export default remindPassThunk;
