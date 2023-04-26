import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function BonusPage(): JSX.Element {
  const navigate = useNavigate();
  const clickHandler = (): void => {
    navigate('/signup');
  };
  return (
    <div className="bonuspage">
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
    
    </div>
  );
}
