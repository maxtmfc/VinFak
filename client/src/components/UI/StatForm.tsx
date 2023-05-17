import * as React from 'react';
import { useEffect } from 'react';
import { Modal, Select, Space } from 'antd';
import { Form, InputNumber, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { createNewRecord, loadWineThunk } from '../../features/redux/slices/wine/wineThunk';
import { StatFormType, Wine, WineByCategory } from '../../types/wine/wineType';
import { loadUsersThunk } from '../../features/redux/slices/wine/adminThunk';

export default function StatForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const arrWineCat = useAppSelector((store) => store.wine.allWine);
  const allUsers = useAppSelector((store) => store.admin.allUsers);

  const wineByCategory: WineByCategory = arrWineCat?.reduce((acc: WineByCategory, wine: Wine) => {
    const categoryTitle = wine?.Category.title;
    if (!acc[categoryTitle]) {
      acc[categoryTitle] = [];
    }
    acc[categoryTitle].push({ label: wine.title, value: wine.title });
    return acc;
  }, {});

  const wineOptions = Object.entries(wineByCategory).map(([categoryTitle, options]) => ({
    label: categoryTitle,
    options,
  }));

  useEffect(() => {
    dispatch(loadWineThunk());
    dispatch(loadUsersThunk());
  }, []);

  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate(-1);
  };
  // const [inputData, setInputData] = React.useState<StatFormType>();

  const [form] = Form.useForm();

  const submitHandler = async (values: string | number): Promise<void> => {
    try {
      const formData = {} as StatFormType;
      Object.keys(values).forEach((key: string | number) => {
        formData[key] = values[key];
      });
      await dispatch(createNewRecord(formData));
      success(values);
      // setInputData(values);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value: string): void => {
    form.setFieldsValue({ title: value });
  };

  const success = async (values: string | number) => {
    const foundUser = allUsers?.find((user) => user.id === values?.userId);
    const foundNickName = foundUser?.nickName;

    await Modal.success({
      title: `Наш студент стал на шаг ближе к цели!`,
      content: `Пользователю ${foundNickName}
      начислено ${values?.count} бокал(-а/ов)`,
    });
  };

  return (
    <div className="Newrecord">
      <Form className="newrecordForm" onFinish={submitHandler} form={form}>
        <Form.Item
          className="newrecordFormText"
          name="userId"
          label="ID клиента"
          style={{ fontSize: '20px' }}
          rules={[
            {
              required: true,
              message: `Заполните поле`,
            },
          ]}
        >
          <InputNumber placeholder={'ID клиента'} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Наименование позиции"
          rules={[
            {
              required: true,
              message: `Заполните поле`,
            },
          ]}
        >
          <Select onChange={handleChange} options={wineOptions} />
        </Form.Item>
        <Form.Item
          name="count"
          label="Количество бокалов"
          rules={[
            {
              required: true,
              message: `Заполните поле`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Space>
          <Button htmlType="submit">ПРИНЯТЬ ЗАЧЁТ</Button>
          <Button onClick={clickHandler}>НАЗАД</Button>
        </Space>
      </Form>
    </div>
  );
}
