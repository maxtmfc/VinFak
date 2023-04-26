import React from 'react';
import { Button, DatePicker, Form, Input, message } from 'antd';
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
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

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
   
      <Form
        onFinish={submitHandler}
        className="newadminform"
        {...formItemLayout}
        form={form}
        style={{ 
          margin: '200px auto', 
          maxWidth: 600 
        }}
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
          rules={[{ required: true, message: 'Пожалуйста, введите вашу фамилию', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nickName"
          label="Никнайм"
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
          <DatePicker style={{width: 400 }} placeholder='Выберите дату рождения'/>
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
        <Button
          style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }}
          type="primary"
          htmlType="submit"
          // onClick={info}
        >
          Создать администратора
        </Button>
        <Button onClick={clickHandler}>Назад</Button>
      </Form>
   
  );
}
