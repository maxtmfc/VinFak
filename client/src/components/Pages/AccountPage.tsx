import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Progressbar from '../UI/Progressbar';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import {
  loadAccountsThunk,
  editAccountThunk,
  deleteAccountThunk,
  changeStatusThunk
} from '../../features/redux/slices/account/accountThunk';
import type { AccountFormType } from '../../types/account/accountTypes';

export default function AccountPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { userAccount } = useAppSelector((store) => store.setUserAccount);

  const userCount: number | undefined = userAccount?.Stats.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0,
  );

  useEffect(() => {
    dispatch(loadAccountsThunk());
  }, []);

  const navigate = useNavigate();
  const clickHandlerStat = (): void => {
    navigate('/user/stat');
  };
  const clickHandlerMenu = (): void => {
    navigate('/admin/menu');
  };
  const clickHandleMain = (): void => {
    navigate('/')
  }

  const [show, setShow] = useState(false);
  const [input, setInput] = useState<AccountFormType>({
    nickName: userAccount.nickName,
    firstName: userAccount?.firstName,
    lastName: userAccount?.lastName,
    email: userAccount?.email,
  });

  const editHandler = (): void => {
    dispatch(editAccountThunk(userAccount?.id, input));
    setShow((prev) => !prev);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const deleteHandler = (): void => {
    dispatch(deleteAccountThunk(userAccount?.id));
    clickHandleMain()
  };

  return (
    <div className="accountpage">
      <Card
        className="accountpageText"
        sx={{ minWidth: 500, backgroundColor: 'black', opacity: '0.8', mt: '100px' }}
      >
        <CardContent>
          {show ? (
            <Input
              type="text"
              sx={{ color: '#fff' }}
              name="nickName"
              value={input.nickName}
              onChange={changeHandler}
              placeholder="Имя пользователя"
            />
          ) : (
            <Typography sx={{ fontSize: '30px', color: '#fff' }} gutterBottom>
              {userAccount?.nickName}
            </Typography>
          )}
          <Typography sx={{ fontSize: '25px', color: '#fff' }} component="div">
            {show ? (
              <Input
                sx={{ color: '#fff' }}
                name="firstName"
                value={input.firstName}
                onChange={changeHandler}
                placeholder="Имя"
              />
            ) : (
              <span>{userAccount?.firstName}</span>
            )}
            {show ? (
              <Input
                sx={{ color: '#fff' }}
                name="lastName"
                value={input.lastName}
                onChange={changeHandler}
                placeholder="Фамилия"
              />
            ) : (
              <span> {userAccount?.lastName}</span>
            )}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: '25px', color: '#fff' }}>
            {userAccount?.Status.title}
            <br />
            {show ? (
              <Input
                sx={{ color: '#fff' }}
                name="email"
                value={input.email}
                onChange={changeHandler}
                placeholder="Электронная почта"
              />
            ) : (
              <span>{userAccount?.email}</span>
            )}
          </Typography>
          <Typography sx={{ fontSize: '30px', color: '#fff' }} component="div">
            Выпито бокалов: {userCount}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            onClick={editHandler}
            style={{ width: 170, marginRight: '20px', color: '#fff', borderColor: 'orange' }}
            variant="outlined"
            size="large"
          >
            {show ? 'Сохранить' : 'Изменить данные'}
          </Button>
          <Button
            onClick={deleteHandler}
            style={{ width: 170, marginLeft: '20px', color: '#fff', borderColor: 'red' }}
            variant="outlined"
            size="large"
          >
            Отчислиться
          </Button>
        </CardActions>
      </Card>
      <br />
      <Progressbar userCount={userCount} status={userAccount?.Status.title} />
      <div className="accountpageText" style={{ display: 'flex', justifyContent: 'space-between' }}>
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
