import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MainPage(): JSX.Element {
  const styles = {
    backgroundColor: '#283b27',
    margin: '30px',
    fontSize: '1.5rem',
  };
  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate('/bonus');
  };

  return (
    <div className="mainpage">
      <span className="mainpageText" style={{ fontSize: '50px', width: 1300 }}>
        Хулиганский винный бар с ретро-антуражем библиотеки
        <br /> и курицей гриль в виде фирменного блюда
      </span>
      <span className="mainpageText" style={{ fontSize: '30px', width: 1300, marginTop: 30 }}>
        Винный Факультет (или просто ВинФак) - это бар от Евгении Качаловой, Михаила Лопатина и
        Никиты Фомкина на Китай-городе в Москве. В читальном зале библиотеки, которую перенесли из
        института, вы найдете снегирей, курицу-гриль и холодильники ЗИЛ с вином, цены на которые
        начинаются от 290 рублей за бокал. Если вы в тайне мечтали, чтобы в библиотеках наливали,
        то, считайте, что ваша мечта воплощена.
      </span>
      <span className="mainpageText" style={{ fontSize: '30px', width: 1300, marginTop: 30 }}>
        Для студентов Винного Факультета доступны специальные цены на великолепное вино.
      </span>
      <span className="mainpageText" style={{ fontSize: '30px', width: 1300, marginTop: 30 }}>
        Вы уже студент ВинФака?
      </span>
      <span className="mainpageText" style={{ fontSize: '30px', width: 1300, marginTop: 30 }}>
        Нет? А очень зря!
        <br />
        Скорее переходите к нам в приемную комиссию
        <br />и подробно знакомьтесь с условинями поступления и учебы на Факультете!
      </span>
      <Button className='mainpagebutton' onClick={clickHandler} style={styles} variant="contained" size="large">
        Приемная комиссия
      </Button>
    </div>
  );
}
