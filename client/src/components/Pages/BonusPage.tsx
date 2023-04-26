import React, { useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../features/redux/hooks';
import { bestUsersThunk } from '../../features/redux/slices/best/bestUsersThunk';
import { Button } from '@mui/material';
interface DataType {
  key: number;
  nickName: string;
  firstName: string;
  status: string;
  count: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Студент',
    dataIndex: 'nickName',
    key: 'nickName',
  },
  {
    title: 'Имя студента',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Звание',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Выпито бокалов',
    dataIndex: 'count',
    key: 'count',
  },
];

export default function BonusPage(): JSX.Element {
  const styles = {
    backgroundColor: '#283b27',
    color: '#c0c5cd',
    margin: '30px',
    zIndex: 2,
    bonusPageText: {
      fontSize: '24px',
      marginTop: '100px',
    },
  };
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((store) => store.setBestUsers.BestUsers);
  const allUsersForStat = allUsers.map(function (allStat) {
    const nickName = allStat.nickName;
    const firstName = allStat.firstName;
    const status = allStat.Status.title;
    const count = allStat.Stats.reduce(
      (accumulator, currentValue) => accumulator + currentValue.count,
      0,
    );
    return { nickName, firstName, status, count };
  });
  const bestUsersForStat = allUsersForStat.sort((a, b) => b.count - a.count).slice(0, 5);

  useEffect(() => {
    dispatch(bestUsersThunk());
  }, []);

  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate('/signup');
  };

  return (
    <div className="userstatpage"
    // className="bonuspage"
    >
      <>
      <span className='bonuspageText'>
      <h1>Условия посупления на «Винный факультет»</h1>
      <button onClick={clickHandler}>
        Поступить на факультет
      </button>
      <ul>
        <li>Любить вино. Даже чуть больше, чем себя самого.</li>
        <li>
          Каждый четверг мы проводим вечеринку «Приемная комиссия», где ты можешь стать абитуриентом
          и когда проявишь себя, то станешь и нашим студентом!
        </li>
        <li>
          Ты можешь поступить на факультет перейдя по кнопке "Поступить", а также получишь зачетку, куда мы наклеим твою фотографию и будем фиксировать твою
          успеваемость.
        </li>
      </ul>
      </span>
        <div className="bonuspageText" style={styles.bonusPageText}>
          Лучшие студенты факультета:
        </div>
        <Table
          className="userstatpageTable"
          columns={columns}
          dataSource={bestUsersForStat}
          pagination={false}
          style={{ margin: '30px', width: '1000px' }}
        />
        <div className="bonuspageText" style={styles.bonusPageText}>
          Поступай на наш факультет!
        </div>
        <Button onClick={clickHandler} style={styles} variant="contained" size="large">
          Поступить
        </Button>
      </>
    </div>
  );
}
