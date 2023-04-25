import * as React from 'react';
import { useEffect } from 'react';
import { Select } from 'antd';
import { Form, InputNumber, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import { createNewRecord, loadWineThunk } from '../../features/redux/slices/wine/wineThunk';
import { StatFormType, Wine, WineByCategory } from '../../types/wine/wineType';

export default function StatForm(): JSX.Element {
  const arrWineCat = useAppSelector((store) => store.wine.allWine);

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

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadWineThunk());
  }, []);

  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate(-1);
  };
  const [wineTitle, setWineTitle] = React.useState<string>('');

  const submitHandler = (values: string | number): void => {
    const formData = {} as StatFormType;
    Object.keys(values).forEach((key: string | number) => {
      formData[key] = values[key];
    });
    dispatch(createNewRecord(formData));
   
  };

  const handleChange = (value: string): void => {
    setWineTitle(value);
  };
  return (
    <Form className="newrecordForm" onFinish={submitHandler} >
      <Form.Item name="userId" label="ID клиента">
        <InputNumber style={{ width: 400 }} placeholder={'ID клиента'} />
      </Form.Item>
      <Form.Item name="title" label="Наименование позиции">
        <Select
          // defaultValue="lucy"
          style={{ width: 300 }}
          onChange={handleChange}
          value={wineTitle}
          options={wineOptions}
        />
      </Form.Item>
      <Form.Item name="count" label="Количество бокалов">
        <InputNumber />
      </Form.Item>
      <Button htmlType="submit">Принять зачёт</Button>
      <Button onClick={clickHandler}>Назад</Button>
    </Form>
  );
}
