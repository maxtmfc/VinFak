import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import { setAllWine } from './wineSlice';

export const loadWineThunk: ThunkActionCreater = () => (dispatch) => {
  axios('http://localhost:3001/wine')
    .then(({ data }) => dispatch(setAllWine(data)))
    .catch(console.log);
};

export const createNewRecord: ThunkActionCreater = (newFormData) => (dispatch) => {
  axios
    .post('http://localhost:3001/wine', newFormData)
    .then(({ data }) => dispatch(addNewRecord(data)))
    .catch(console.log);
};
