import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import type { AdminFormType } from '../../../../types/wine/adminType';
import { addNewAdmin, setAdmins } from './adminSlice';

// export const loadPostsThunk: ThunkActionCreater = () => (dispatch) => {
//     axios('http://localhost:3001/api/admin')
//       .then(({ data }) => dispatch(setAdmins(data)))
//       .catch(console.log);
//   };

const createNewAdmin: ThunkActionCreater = (formData) => (dispatch) => {
  axios
    .post<AdminFormType>('http://localhost:3001/api/admin', formData)
    .then(({ data }) => dispatch(addNewAdmin(data)))
    .catch(console.log);
};

export default createNewAdmin;
