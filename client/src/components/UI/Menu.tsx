import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Modal,
  Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/redux/hooks';
import {
  createNewWine,
  deleteOneWineThunk,
  editWineThunk,
  loadWineThunk,
} from '../../features/redux/slices/wine/wineThunk';
import type { ArrCategory, Category, WineWithCategory } from '../../types/wine/wineType';

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

export default function Menu(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const allWine = useAppSelector((store) => store.wine.allWine);
  const { userAccount } = useAppSelector((store) => store.setUserAccount);

  const arrCategory: ArrCategory[] = allWine
    ?.map((wine) => ({
      label: wine.Category.id,
      value: wine.Category.title,
    }))
    .reduce((acc, cur) => {
      if (!acc.some((item) => item.label === cur.label)) {
        acc.push(cur);
      }
      return acc;
    }, []);
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
    let inputNode;
    if (inputType === 'text') {
      inputNode = <Input />;
    } else if (inputType === 'number' && dataIndex !== 'categoryId') {
      inputNode = <InputNumber />;
    } else {
      inputNode = (
        <Select>
          {arrCategory?.map((category) => (
            <Select.Option
              style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }}
              key={category.label}
              value={category.label}
            >
              {category.value}
            </Select.Option>
          ))}
        </Select>
      );
    }

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
        const editedRow = { ...row, id: item.id };
        dispatch(editWineThunk(editedRow));

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

  const handleDelete = (key: number): void => {
    dispatch(deleteOneWineThunk(key));
  };

  const columns = [
    {
      title: 'Категория',
      dataIndex: 'categoryId',
      width: '17%',
      editable: true,
      render: (categoryId: number): string => {
        const category: Category = allWine.find(
          (wine) => wine.Category.id === categoryId,
        )?.Category;

        return category ? category.title : '';
      },
      key: 'category',
    },
    {
      title: 'Наименование позиции',
      dataIndex: 'title',
      width: '30%',
      editable: true,
      key: 'title',
    },
    {
      title: 'Абитуриент',
      dataIndex: 'price',
      width: '10%',
      editable: true,
      key: 'price',
    },
    {
      title: `Студент -14%`,
      dataIndex: 'priceStudent',
      width: '10%',
      editable: false,
      key: `priceStudent`,
    },
    {
      title: 'Бакалавр -26%',
      dataIndex: 'priceBakalavr',
      width: '10%',
      editable: false,
      key: 'priceBakalavr',
    },
    {
      title: 'Редактировать',
      key: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Сохранить
            </Typography.Link>
            <Popconfirm title="Вы уверены?" onConfirm={cancel}>
              <a>Отмена</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
            style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }}
          >
            Изменить
          </Typography.Link>
        );
      },
    },
    {
      title: 'Убрать из меню',
      key: 'delete',
      dataIndex: 'operation',
      render: (_: any, record: { key: number }) =>
        allWine.length >= 1 ? (
          <Popconfirm title="Вы уверены?" onConfirm={() => handleDelete(record.key)}>
            <a>В архив</a>
          </Popconfirm>
        ) : null,
    },
  ];
  user?.admin ? columns : columns.splice(-2);

  const mergedColumns = columns?.map((col) => {
    if (!col.editable) {
      return col;
    }
    {
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
    }
  });

  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate(-1);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleAddPosition = (): void => {
    // setShowModal(true);
    if (editingKey === '') {
      form.resetFields();
    } else {
      const record = data.find((item) => item.key === editingKey);
      form.setFieldsValue(record);
    }
    setShowModal(true);
  };
  const handleModalClose = (): void => {
    setShowModal(false);
  };

  const handleAdd = (): void => {
    try {
      form.validateFields().then((values) => {
        const newItem: Item = {
          key: allWine.length + 1,
          categoryId: values.categoryId,
          title: values.title,
          price: values.price,
        };
        dispatch(createNewWine(newItem));
        setShowModal(false);
      });
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  return (
    <div className="Menu">
      <Modal
        style={{ fontFamily: 'Fira Sans Condensed, sans-serif' }}
        title="Добавить новую позицию"
        open={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={handleAdd}>
            Добавить
          </Button>,
        ]}
      >
        <Form form={form} className="menuForm">
          <Form.Item
            name="categoryId"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите категорию',
              },
            ]}
          >
            <Select placeholder="Категория">
              {arrCategory?.map((category) => (
                <Select.Option key={category.label} value={category.label}>
                  {category.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, заполните наименование позиции',
              },
            ]}
          >
            <Input placeholder="Наименование позиции" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите цену',
              },
            ]}
          >
            <InputNumber style={{ width: '472.01px' }} placeholder="Цена без скидки" />
          </Form.Item>
        </Form>
      </Modal>
      <Form form={form} component={false}>
        {user.admin && <Button onClick={handleAddPosition}>ДОБАВИТЬ ПОЗИЦИЮ</Button>}

        <Button onClick={clickHandler}>НАЗАД</Button>
        <div className="parent">
          <span className="menuStatus">Твой текущий статус: {userAccount?.Status.title}</span>
        </div>
        {!allWine && 'Loading ...'}
        {allWine && (
          <Table
            style={{ margin: '30px 20px 20px 20px' }}
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
    </div>
  );
}
