import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../features/redux/hooks';

export default function NewPassPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { uuid } = useParams();

  const [haveAccess, setHaveAccess] = useState(false);
  useEffect(() => {
    axios.post(`/auth/login/forget/${uuid}`).then(() => setHaveAccess(true));
  }, []);

  const submitHandler = (values: string): void => {
    const formData = {};
    Object.keys(values).forEach((key: string) => {
      formData[key] = values[key];
    });
    axios.post(`/auth/login/forget/new-pass/${uuid}`, formData);
    navigate('/login');
  };

  const [form] = Form.useForm();

  if (!haveAccess) return <div>Link is not working</div>;

  const styles = {
    marginTop: '200px',
  };
  return (
    <div className="Remind">
      <Form className="remindForm" form={form} onFinish={submitHandler}>
        <Form.Item
          name="password"
          style={styles}
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
        <Button style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }} htmlType="submit">
          ИЗМЕНИТЬ ПАРОЛЬ
        </Button>
      </Form>
    </div>
  );
}
