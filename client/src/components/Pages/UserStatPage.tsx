import React, { useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType} from 'antd/es/table';
import { useAppSelector, useAppDispatch } from '../../features/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { loadUserStatThunk } from '../../features/redux/slices/account/userStatThunk';
import { Button } from '@mui/material';

interface DataType {
  key: number;
  wine: string;
  count: number;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Название вина',
    dataIndex: 'wine',
    key: 'wine',
  },
  {
    title: 'Количество бокалов',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'Когда выпито',
    dataIndex: 'date',
    key: 'date',
  },
];

export default function UserStatPage(): JSX.Element {
  const styles = {
    backgroundColor: '#283b27',
    color: '#c0c5cd',
    margin: '30px',
    zIndex: 2,
  };
  const dispatch = useAppDispatch();
  const oneUserStat = useAppSelector((store) => store.setOneUserStat.OneUserStat);
  const userStatWithDate = oneUserStat.map(function (userStat) {
    const wine = userStat.Wine.title;
    const count = userStat.count;
    const date = new Date(userStat.createdAt).toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    });
    return { wine, count, date };
  });
  useEffect(() => {
    dispatch(loadUserStatThunk());
  }, []);

  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate('/user');
  };

  return (
    <div className="userstatpage">
      <>
        <Table
          className="userstatpageTable"
          columns={columns}
          dataSource={userStatWithDate}
          pagination={false}
          style={{ margin: '100px', width: '1000px' }}
        />
        <Button onClick={clickHandler} style={styles} variant="contained" size="large">
          Назад
        </Button>
      </>
    </div>
  );
}
