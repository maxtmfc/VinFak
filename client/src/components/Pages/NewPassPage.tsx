import { Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../features/redux/hooks';

export default function NewPassPage():JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const clickHandler = (): void => {
  //   navigate('/login');
  // };

  const [form] = Form.useForm();
  return (
    <Form form={form}>
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
        </Form>
  )
}
