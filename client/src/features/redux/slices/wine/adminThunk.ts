import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import type { AdminFormType } from '../../../../types/wine/adminType';
import { addNewAdmin } from './adminSlice';

const createNewAdmin: ThunkActionCreater = (formData) => (dispatch) => {
  axios
    .post<AdminFormType>('/admin', formData)
    .then(({ data }) => dispatch(addNewAdmin(data)))
    .catch(console.log);
};

export default createNewAdmin;
