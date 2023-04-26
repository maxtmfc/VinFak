import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MainPage(): JSX.Element {
  const styles = {
    backgroundColor: '#283b27',
    color: '#c0c5cd',
    margin: '30px',
    fontSize: '1.5rem',
  };
  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate('/bonus');
  };

  return (
    <div className="mainpage">
      <span className="mainpageText">
        Еще у нас живут снегири. Вася и Петя. Очень красивые и голосистые. <br />
        Но они фотографироваться не любят. <br />
        Приходите смотреть!
      </span>
      <Button onClick={clickHandler} style={styles} variant="contained" size="large">
        Приемная комиссия
      </Button>
    </div>
  );
}
