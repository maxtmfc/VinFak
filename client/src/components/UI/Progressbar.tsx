import React from 'react';
import { Progress, Space } from 'antd';

const customFormat = (percent: number): JSX.Element => (
  <span style={{ color: 'aliceblue' }}>{percent}%</span>
);
type ProgressbarProps = {
  status: string;
  userCount: number;
};

export default function Progressbar({ userCount, status }: ProgressbarProps): JSX.Element {
  return (
    <div
      className="accountpageText"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '30px', color: 'aliceblue', textAlign: 'center' }}>
        Ниже ты сможешь отслеживать свои успехи в учебе.
        <br />
        Сейчас ты носишь гордое звание: {status}!
        <br />
      </div>
      <br />
      {status === 'Абитуриент' && (
        <div style={{ fontSize: '30px', color: 'aliceblue', textAlign: 'center', lineHeight: 1.2 }}>
          Теперь ты с нами одной крови. И можешь пить вина из раздела «Только для студентов ВинФака»
          <br />
          Пока твои цены находятся в графе АБИТУРИЕНТ.
          <br />
          Но плох тот абитуриент, который не хочет стать настоящим студентом!
          <br />
          Для того, чтобы прорваться в новую жизнь, надо выпить 20 бокалов как абитуриент и потом
          уже платить как СТУДЕНТ.
          <br />
          <br />
          Тебе осталось {20 - userCount}!
        </div>
      )}
      {status === 'Студент' && (
        <div style={{ fontSize: '30px', color: 'aliceblue', textAlign: 'center', lineHeight: 1.2 }}>
          Став студентом тебе прямая дорога в БАКАЛАВРЫ.
          <br />
          Высшее образование — это непросто!
          <br />
          Тебе придется напряженно учиться и, выпив 50 бокалов, ты перейдешь в другую лигу.
          <br />
          Тебе осталось всего {70 - userCount}!
        </div>
      )}
      {status === 'Бакалавр' && (
        <div style={{ fontSize: '30px', color: 'aliceblue', textAlign: 'center', lineHeight: 1.2 }}>
          Все жизненные пути отныне открыты для тебя!
          <br />
          Ты же можешь пить на 26% дешевле, чем все остальные.
        </div>
      )}
      {status === 'Абитуриент' && (
        <Space wrap style={{ marginTop: '10px' }}>
          <Progress
            className="my-progress"
            type="circle"
            percent={(userCount / 20) * 100}
            size={150}
            format={customFormat}
            strokeColor="aliceblue"
            style={{ margin: '20px' }}
          />
        </Space>
      )}
      {status === 'Студент' && (
        <Space wrap style={{ marginTop: '10px' }}>
          <Progress
            className="my-progress"
            type="circle"
            percent={((userCount - 20) / 50) * 100}
            size={150}
            format={customFormat}
            strokeColor="aliceblue"
            style={{ margin: '20px' }}
          />
        </Space>
      )}
      {status === 'Бакалавр' && (
        <Space wrap style={{ marginTop: '10px' }}>
          <Progress
            strokeColor="#c0c5cd"
            className="my-progress"
            type="circle"
            percent={100}
            size={150}
            format={customFormat}
            style={{ margin: '20px' }}
          />
        </Space>
      )}
    </div>
  );
}
