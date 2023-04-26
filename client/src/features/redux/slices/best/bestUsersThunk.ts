import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import {setBestUsers} from './bestUsersSlice';
import type { UserForAccount } from '../../../../types/account/accountTypes';


export const bestUsersThunk: ThunkActionCreater = () => (dispatch) => {   
    axios<UserForAccount[]>('http://localhost:3001/best')
      .then(({ data }) => dispatch(setBestUsers(data)))
      .catch(console.log);
  };