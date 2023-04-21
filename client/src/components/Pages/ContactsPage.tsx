import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/redux/hooks';

export default function MainPage(): JSX.Element {
  
    const dispatch = useAppDispatch();
  const styles = {
    backgroundColor: '#283b27',
    color: '#c0c5cd',
    margin: '30px',
  };
  // const navigate = useNavigate();
  // const clickHandler = (): void => {
  //   navigate('/bonus');
  // };

  return (
    <div className="mainpage">
      <span>
       приходи по этому адресу. <br />
        Здесь вас ждут яндекс карты. <br />
        Приходите смотреть!
      </span>
      {/* <Button onClick={clickHandler} style={styles} variant="contained" size="large">
        Поступить на факультет
      </Button> */}
    </div>
  );
}
