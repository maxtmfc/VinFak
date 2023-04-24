import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import {
  createNewWine,
  deleteOneWineThunk,
  editWineThunk,
  loadWineThunk,
} from '../../features/redux/slices/wine/wineThunk';
import type { Category, WineWithCategory } from '../../types/wine/wineType';
import { addWine } from '../../features/redux/slices/wine/wineSlice';

type Item = {
  key: number;
  categoryId: number;
  title: string;
  price: number;
};

type EditableCellProps = {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'text' | 'number';
  record: Item;
  index: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Заполните поле`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function Menu(): JSX.Element {
  const allWine = useAppSelector((store) => store.wine.allWine);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | number>('');
  const isEditing = (record: Item): boolean => record.key === editingKey;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadWineThunk());
  }, [dispatch]);

  const edit = (record: Partial<Item> & { key: React.Key }): void => {
    form.setFieldsValue({ categoryId: 0, title: '', price: 0, ...record });
    setEditingKey(record.key);
  };

  const cancel = (): void => {
    setEditingKey('');
  };

  const save = async (key: React.Key): Promise<void> => {
    try {
      const row = (await form.validateFields()) as WineWithCategory;

      const newData = [...allWine];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        dispatch(editWineThunk(row));

        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setEditingKey('');
      } else {
        newData.push(row);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAdd = (): void => {
    const newData = {
      id: allWine.length + 1,
      key: allWine.length + 1,
      title: 'Новая позиция',
      price: 0,
      categoryId: 1,
      createdAt: '',
      updatedAt: '',
      Category: {
        id: 1,
        title: '',
        createdAt: '',
        updatedAt: '',
      },
    };
    
    dispatch(createNewWine(newData));
  };

  const handleDelete = (key: number): void => {
    dispatch(deleteOneWineThunk(key));
  };

  const columns = [
    {
      title: 'Категория',
      dataIndex: 'categoryId',
      width: '15%',
      editable: true,
      render: (categoryId: number): string => {
        const category: Category = allWine.find(
          (wine) => wine.Category.id === categoryId,
        )?.Category;

        return category ? category.title : '';
      },
    },
    {
      title: 'Наименование позиции',
      dataIndex: 'title',
      width: '30%',
      editable: true,
    },
    {
      title: 'Абитуриент',
      dataIndex: 'price',
      width: '10%',
      editable: true,
    },
    {
      title: `Студент -14%`,
      dataIndex: 'priceStudent',
      width: '10%',
      editable: false,
    },
    {
      title: 'Бакалавр -26%',
      dataIndex: 'priceBakalavr',
      width: '10%',
      editable: false,
    },
    {
      title: 'Редактировать',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Вы уверены?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'Удалить позицию',
      dataIndex: 'operation',
      render: (_: any, record: { key: number }) =>
        allWine.length >= 1 ? (
          <Popconfirm title="Вы уверены?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'title' ? 'text' : 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate(-1);
  };

  return (
    <Form form={form} component={false}>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{ margin: '100px 20px 0px 20px', fontFamily: 'Fira Sans Condensed, sans-serif' }}
      >
        Добавить позицию
      </Button>
      <Button
        onClick={clickHandler}
        type="primary"
        style={{
          backgroundColor: 'black',
          margin: '100px 20px 0px 20px',
          fontFamily: 'Fira Sans Condensed, sans-serif',
        }}
      >
        Назад
      </Button>

      {!allWine && 'Loading ...'}
      {allWine && (
        <Table
          style={{ margin: '30px 20px 0px 20px' }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={allWine}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      )}
    </Form>
  );
}
