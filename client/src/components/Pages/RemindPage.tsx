import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useAppDispatch } from '../../features/redux/hooks';
import remindPassThunk from '../../features/redux/slices/remind/thunkRemind';

export default function RemindPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: string): void => {
    const formData = {} as string;
    Object.keys(values).forEach((key: string) => {
      formData[key] = values[key];
    });
    dispatch(remindPassThunk(formData));
    success();
  };

  const success = () => {
    Modal.success({
      title: `Письмо отправлено`,
      content: `На указанную почту выслана ссылка для смены пароля`,
    });
  };

  return (
    <div className="Remind">
      <Form className="remindForm" onFinish={handleSubmit}>
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
        <Button style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }} htmlType="submit">
          ОТПРАВИТЬ
        </Button>
      </Form>
    </div>
  );
}
