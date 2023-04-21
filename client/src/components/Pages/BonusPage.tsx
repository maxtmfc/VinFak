import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { getUserThunk } from '../../features/redux/slices/bonus';
import OneUser from '../UI/OneUser';


export default function BonusPage(): JSX.Element {
  
  const user = useAppSelector(state=> state.users.users)
  const dispatch=useAppDispatch()
  
  useEffect(() => {
  dispatch(getUserThunk()) //   как вызвать функцию
}, [])

  
  const styles = {
    backgroundColor: '#283b27',
    color: '#c0c5cd',
    margin: '30px',
  };
  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate('/bonus');
  };

  return (
    <div className="mainpage">
      <span>
        GРИЕМНАЯ ХОМИССИЯ. <br />
       Я БОЮСЬ ИХ. <br />
        Приходите смотреть!
      </span>
      <Button onClick={clickHandler} style={styles} variant="contained" size="large">
        Поступить на факультет
      </Button>
      <div>
      {user?.map((el) => (
          <OneUser users={el} key={el.id} />
        ))}
      </div>
    </div>
  );
}