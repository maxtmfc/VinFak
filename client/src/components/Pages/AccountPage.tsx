import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Progressbar from '../UI/Progressbar';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { Modal } from 'antd';
import {
  loadAccountsThunk,
  editAccountThunk,
  deleteAccountThunk,
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
  const clickHandlerUser = (): void => {
    navigate('/user');
  };
  const clickHandlerStat = (): void => {
    navigate('/user/stat');
  };
  const clickHandlerMenu = (): void => {
    navigate('/admin/menu');
  };
  const clickHandleMain = (): void => {
    navigate('/');
  };

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
  function handleDelete() {
    Modal.confirm({
      title: 'Вы уверены, что хотите отчислиться с факультета? Ваша зачетка будет аннулирована.',
      content: 'Это действие не может быть отменено. Придется поступать заново!',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        dispatch(deleteAccountThunk(userAccount?.id));
        clickHandleMain();
      },
      onCancel() {
        clickHandlerUser();
      },
    });
  }
  const deleteHandler = (): void => {
    handleDelete();
  };

  return (
    <div className="accountpage" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Card
        className="accountpageText"
        sx={{
          minWidth: 700,
          backgroundColor: 'black',
          opacity: '0.9',
          marginLeft: '200px',
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: '50px', color: 'aliceblue' }} component="div">
            Зачетная книжка № {userAccount?.id}
          </Typography>
          {show ? (
            <Input
              type="text"
              sx={{ color: 'aliceblue' }}
              name="nickName"
              value={input.nickName}
              onChange={changeHandler}
              placeholder="Имя пользователя"
            />
          ) : (
            <Typography sx={{ fontSize: '30px', color: 'aliceblue' }} gutterBottom>
              Псевдоним: {userAccount?.nickName}
            </Typography>
          )}
          <Typography sx={{ fontSize: '30px', color: 'aliceblue' }} component="div">
            {show ? (
              <Input
                sx={{ color: 'aliceblue' }}
                name="firstName"
                value={input.firstName}
                onChange={changeHandler}
                placeholder="Имя"
              />
            ) : (
              <>
                <span>Имя: {userAccount?.firstName}</span>
                <br />
              </>
            )}
            {show ? (
              <Input
                sx={{ color: 'aliceblue' }}
                name="lastName"
                value={input.lastName}
                onChange={changeHandler}
                placeholder="Фамилия"
              />
            ) : (
              <span> Фамилия: {userAccount?.lastName}</span>
            )}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: '30px', color: 'aliceblue' }}>
            Звание: {userAccount?.Status.title}
            <br />
            {show ? (
              <Input
                sx={{ color: 'aliceblue' }}
                name="email"
                value={input.email}
                onChange={changeHandler}
                placeholder="Электронная почта"
              />
            ) : (
              <span>Адрес почты: {userAccount?.email}</span>
            )}
          </Typography>
          <Typography sx={{ fontSize: '30px', color: 'aliceblue' }} component="div">
            Выпито бокалов: {userCount}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            onClick={editHandler}
            style={{ width: 300, marginRight: '20px', color: 'aliceblue', borderColor: 'orange', fontSize: '30px' }}
            variant="outlined"
            size="large"
          >
            {show ? 'Сохранить' : 'Изменить данные'}
          </Button>
          <Button
            onClick={deleteHandler}
            style={{ width: 300, marginLeft: '20px', color: 'aliceblue', borderColor: 'red', fontSize: '30px' }}
            variant="outlined"
            size="large"
          >
            Отчислиться
          </Button>
        </CardActions>
      </Card>
      <br />
      <div style={{ marginRight: '200px', width: 700 }}>
        <Progressbar userCount={userCount} status={userAccount?.Status.title} />
        <div
          className="accountpageText"
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <Button
            onClick={clickHandlerStat}
            style={{ width: 350, color: 'aliceblue', borderColor: 'aliceblue', fontSize: '25px' }}
            variant="outlined"
            size="large"
          >
            Подробная статистика
          </Button>
          <Button
            onClick={clickHandlerMenu}
            style={{ width: 350, marginLeft: '20px', color: 'aliceblue', borderColor: 'aliceblue', fontSize: '25px' }}
            variant="outlined"
            size="large"
          >
            Винная карта Студентов
          </Button>
        </div>
      </div>
    </div>
  );
}
