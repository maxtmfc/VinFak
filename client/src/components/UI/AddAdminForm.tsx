import React from 'react';
import { Button, DatePicker, Form, Input, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/redux/hooks';
import { createNewAdmin } from '../../features/redux/slices/wine/adminThunk';
import type { AdminFormType } from '../../types/wine/adminType';

export default function AddAdminForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate(-1);
  };

  const [form] = Form.useForm();

  const submitHandler = (values: string): void => {
    const formData = {} as AdminFormType;
    Object.keys(values).forEach((key: string) => {
      if (key === 'birthDate') {
        formData[key] = values[key].format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
      } else {
        formData[key] = values[key];
      }
    });
    dispatch(createNewAdmin(formData));
    navigate('/admin');
  };

  return (
    <div className="Newadmin">
      <Form
        onFinish={submitHandler}
        className="newadminform"
        form={form}
      >
        <Form.Item
          name="firstName"
          label="Имя"
          rules={[{ required: true, message: 'Пожалуйста, введите ваше имя', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Фамилия"
          rules={[
            { required: true, message: 'Пожалуйста, введите вашу фамилию', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nickName"
          label="Псевдоним"
          tooltip="Как вы хотите, чтобы другие пользователи видели вас на сайте"
          rules={[{ required: true, message: 'Пожалуйста, введите никнейм', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
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
          <Input />
        </Form.Item>
        <Form.Item
          name="birthDate"
          label="Дата рождения"
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
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите пароль',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Space style={{marginRight: "640px"}}>
          <Button
            style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }}
            type="primary"
            htmlType="submit"
            // onClick={info}
          >
            СОЗДАТЬ АДМИНИСТРАТОРА
          </Button>
          <Button onClick={clickHandler}>НАЗАД</Button>
        </Space>
      </Form>
    </div>
  );
}
