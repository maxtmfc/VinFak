import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import type { AdminFormType } from '../../../../types/wine/adminType';
import { addNewAdmin, setAllUsers } from './adminSlice';

export const loadUsersThunk: ThunkActionCreater = () => (dispatch) => {  
  axios
    .get<AdminFormType>('/admin')
    .then(({ data }) => dispatch(setAllUsers(data)))
    .catch(console.log);
};

export const createNewAdmin: ThunkActionCreater = (formData) => (dispatch) => {  
  axios
    .post<AdminFormType>('/admin', formData)
    .then(({ data }) => dispatch(addNewAdmin(data)))
    .catch(console.log);
};