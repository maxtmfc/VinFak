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
    title: 'Псевдоним',
    dataIndex: 'nickName',
    key: 'nickName',
  },
  {
    title: 'Имя',
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
  const user = useAppSelector((store) => store.user);
  const styles = {
    backgroundColor: '#283b27',
    margin: '30px',
    fontSize: '1.5rem',
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
  const signupHandler = (): void => {
    navigate('/signup');
  };
  const userHandler = (): void => {
    navigate('/user');
  };

  return (
    <div className="bonuspage">
      <span className="bonuspageText" style={{ fontSize: '55px', marginTop: 100 }}>
        Условия поступления и обучения на ВинФаке
      </span>
      <div className="section">
        <div className="bonussection">
          <span className="bonuspageTitile">АБИТУРИЕНТ</span>
          <br />
          <span className="bonuspageText">
            Регистрируйся в разделе ПОСТУПИТЬ — и ты получишь электронную зачетку! Теперь ты с нами
            одной крови. И можешь пить вина из раздела «Только для студентов ВинФака».
          </span>
        </div>
        <div className="bonussection">
          <span className="bonuspageTitile">СТУДЕНТ</span>
          <br />
          <span className="bonuspageText">
            Плох тот абитуриент, который не хочет стать настоящим студентом! Для того, чтобы
            прорваться в новую жизнь, надо выпить 20 бокалов как абитуриент и потом уже платить как
            СТУДЕНТ.
            <br />А это уже нешуточная выгода: - 14%
          </span>
        </div>
        <div className="bonussection">
          <span className="bonuspageTitile">БАКАЛАВР</span>
          <br />
          <span className="bonuspageText">
            Став студентом тебе прямая дорога в БАКАЛАВРЫ. Высшее образование — это непросто. Тебе
            придется напряженно учиться и выпив 50 бокалов ты перейдешь в другую лигу. Все жизненные
            пути станут открыты для тебя.
            <br />
            Ты же сможешь пить на 26% дешевле, чем все остальные.
          </span>
        </div>
      </div>

      {user.status === 'logged' ? (
        <Button
          className="bonuspagebutton"
          onClick={userHandler}
          style={styles}
          variant="contained"
          size="large"
        >
          Проверить свою зачетку
        </Button>
      ) : (
        <Button
          className="bonuspagebutton"
          onClick={signupHandler}
          style={styles}
          variant="contained"
          size="large"
        >
          Поступить на факультет
        </Button>
      )}
      <span className="bonuspageText" style={{ fontSize: '30px', width: 1300, marginTop: 1 }}>
        А это рейтинг 5 лучших студентов ВинФака. Попробуй потягаться с ними в успеваемости!
      </span>
      <Table
        columns={columns}
        dataSource={bestUsersForStat}
        pagination={false}
        style={{ margin: '20px', width: '1300px' }}
      />
    </div>
  );
}
