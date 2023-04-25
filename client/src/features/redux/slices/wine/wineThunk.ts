import axios from 'axios';
import type { ThunkActionCreater } from '../../store';
import { addNewRecord, addWine, deleteWine, editWine, setAllWine } from './wineSlice';
import type { WineWithCategory } from '../../../../types/wine/wineType';

export const loadWineThunk: ThunkActionCreater = () => (dispatch) => {
  axios<WineWithCategory[]>('/wine')
    .then(({ data }) => {
      dispatch(
        setAllWine(
          data.map((elem) => {
            elem.key = elem.id;
            return elem;
          }),
        ),
      );
    })
    .catch(console.log);
};

export const createNewRecord: ThunkActionCreater = (newFormData) => (dispatch) => {
  axios
    .post<WineWithCategory>('/wine', newFormData)
    .then(({ data }) => dispatch(addNewRecord(data)))
    .catch(console.log);
};

export const createNewWine: ThunkActionCreater = (newData) => (dispatch) => {
  axios
    .post<WineWithCategory>('/wine/newwine', newData)
    .then(({ data }) => dispatch(addWine({ ...data, key: data.id })))
    .catch(console.log);
};

export const deleteOneWineThunk: ThunkActionCreater<WineWithCategory['id']> =
  (wineId) => (dispatch) => {
    axios
      .delete(`/wine/${wineId}`)
      .then(() => dispatch(deleteWine(wineId)))
      .catch(console.log);
  };

export const editWineThunk: ThunkActionCreater<WineWithCategory> = (wine) => (dispatch) => {
  axios
    .patch<Omit<WineWithCategory, 'key'>>(`/wine`, wine)
    .then(({ data }) => dispatch(editWine({ ...data, key: data.id })))
    .catch(console.error);
};
