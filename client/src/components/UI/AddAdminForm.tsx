import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../features/redux/hooks';
import createNewAdmin from '../../features/redux/slices/wine/adminThunk';
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
    Object.keys(values).forEach((key) => {
      if (key !== 'confirm') formData[key] = values[key];
    });
    dispatch(createNewAdmin(formData));
  };

  return (
    <Form
      onFinish={submitHandler}
      className="newadminform"
      {...formItemLayout}
      form={form}
      // name="register"
      style={{ margin: '200px auto', maxWidth: 600 }}
    >
      <Form.Item
        name="firstName"
        label="Имя"
        rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Фамилия"
        rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="nickName"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        // getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> */}
      <Button
        style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }}
        type="primary"
        htmlType="submit"
      >
        Создать администратора
      </Button>
      <Button onClick={clickHandler}>Назад</Button>
    </Form>
  );
}
