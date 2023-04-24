import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Progressbar from '../UI/Progressbar';

export default function AccountPage(): JSX.Element {
  const styles = {
    backgroundColor: '#283b27',
    color: '#c0c5cd',
    margin: '30px',
  };
  const navigate = useNavigate();
  const clickHandlerStat = (): void => {
    navigate('/user/stat');
  };
  const clickHandlerMenu = (): void => {
    navigate('/admin/menu');
  };
  return (
    <div className="accountpage">
      <Card
        className="accountpageText"
        sx={{ minWidth: 500, backgroundColor: 'black', opacity: '0.8', mt: '100px' }}
      >
        <CardContent>
          <Typography sx={{ fontSize: '30px', color: '#fff' }} gutterBottom>
            nickName
          </Typography>
          <Typography sx={{ fontSize: '25px', color: '#fff' }} component="div">
            firstName LastName
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: '25px', color: '#fff' }}>
            status
            <br />
            email
          </Typography>
          <Typography sx={{ fontSize: '30px', color: '#fff' }} component="div">
            Count
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            style={{ width: 170, marginRight: '20px', color: '#fff', borderColor: 'orange' }}
            variant="outlined"
            size="large"
          >
            Изменить данные
          </Button>
          <Button
            style={{ width: 170, marginLeft: '20px', color: '#fff', borderColor: 'red' }}
            variant="outlined"
            size="large"
          >
            Отчислиться
          </Button>
        </CardActions>
      </Card>
      <br />
      <Progressbar />
      <div
        className="accountpageText"
        style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}
      >
        <Button
          onClick={clickHandlerStat}
          style={{ width: 250, color: '#fff', borderColor: '#fff' }}
          variant="outlined"
          size="large"
        >
          Подробная статистика
        </Button>
        <Button
          onClick={clickHandlerMenu}
          style={{ width: 250, marginLeft: '20px', color: '#fff', borderColor: '#fff' }}
          variant="outlined"
          size="large"
        >
          Винная карта Студентов
        </Button>
      </div>
    </div>
  );
}
