import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminPage(): JSX.Element {
  const navigate = useNavigate();
  const handleButtonClick = (page: string): void => {
    navigate(`/admin/${page}`);
  };
  return (
    <div className="adminpage">
      <button type='button' onClick={() => handleButtonClick('newrecord')}>Принять новый зачёт</button>
      <button type='button' onClick={() => handleButtonClick('menu')}>Меню</button>
      <button type='button' onClick={() => handleButtonClick('newadmin')}>Создать нового администратора</button>
    </div>
  );
}
