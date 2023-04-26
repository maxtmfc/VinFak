import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import { setAllUserStat } from './userStatSlice';
import type { UserStatType } from '../../../../types/account/userStatTypes';

export const loadUserStatThunk: ThunkActionCreater = () => (dispatch) => {   
    axios<UserStatType[]>('http://localhost:3001/account/userstat')
      .then(({ data }) => dispatch(setAllUserStat(data)))
      .catch(console.log);
  };