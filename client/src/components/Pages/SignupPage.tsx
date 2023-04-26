import React from 'react';
import { useAppDispatch } from '../../features/redux/hooks';
import { signUpThunk } from '../../features/redux/slices/user/thunkActions';
import type { SignUpForm } from '../../types/user/formTypes';
import { useNavigate } from 'react-router-dom';
import { Form, Input, DatePicker, Button, Grid, Space } from 'antd';

export default function SignupPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate('/bonus');
  };

  const submitHandler = (values: string): void => {
    const formData = {} as SignUpForm;
    Object.keys(values).forEach((key: string) => {
      if (key === 'birthDate') {
        formData[key] = values[key].format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
      } else {
        formData[key] = values[key];
      }
    });
    dispatch(signUpThunk(formData));
    navigate('/user');
  };

  const [form] = Form.useForm();

  return (
    <div className="Signup">
      <Form className="signuppage" onFinish={submitHandler} form={form}>
        <Form.Item
          name="nickName"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш никнейм', whitespace: true }]}
        >
          <Input placeholder="Никнейм для приложения" />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя', whitespace: true }]}
        >
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            { required: true, message: 'Пожалуйста, введите вашу фамилию', whitespace: true },
          ]}
        >
          <Input placeholder="Фамилия" />
        </Form.Item>
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
          name="birthDate"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите дату рождения',
            },
          ]}
        >
          <DatePicker placeholder="Выберите дату рождения" />
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
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, подтвердите пароль',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Подтвердите пароль" />
        </Form.Item>
        <Space>
          <Button htmlType="submit">
            Поступить на факультет
          </Button>
          <Button onClick={clickHandler}>
            Назад
          </Button>
        </Space>
      </Form>
    </div>
  );
}
