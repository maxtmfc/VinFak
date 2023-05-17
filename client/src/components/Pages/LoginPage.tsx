import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { loginUserThunk } from '../../features/redux/slices/user/thunkActions';
import type { LoginForm } from '../../types/user/formTypes';
import { Form, Input, Button, Space } from 'antd';

const theme = createTheme();

export default function LoginPage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((store) => store.user.error);
  const [errorState, setErrorState] = useState('');

  useEffect(() => {
    setErrorState(error);
  }, [error]);

  const submitHandler = (values: string): void => {
    const formData = {} as LoginForm;
    Object.keys(values).forEach((key: string) => {
      formData[key] = values[key];
    });
    dispatch(loginUserThunk(formData));
    navigate('/user');
  };

  const forgetHandler = () => {
    navigate('/login/forget')
  }
  const [form] = Form.useForm();

  return (
    <div className="Login">
      <Form className="loginForm" onFinish={submitHandler} form={form}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Не соотвветствует форме E-mail!',
            },
            {
              required: true,
              message: 'Пожалуйста, введите E-mail!',
            },
          ]}
        >
          <Input placeholder="Электронная почта" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите пароль',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Space>
          <Button style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }} htmlType="submit">
            ВОЙТИ
          </Button>
          <Button style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }} onClick={forgetHandler}>ЗАБЫЛИ ПАРОЛЬ?</Button>
        </Space>
        {errorState && <span className="errorMessage">{errorState}</span>}
      </Form>
    </div>
  );
}
