import { Card, CardContent, Typography, CardActions, Button, Input } from '@mui/material';
import React from 'react';
import type { UserStatType } from '../../types/account/userStatTypes';

type UserStatProps = {
  stat: UserStatType;
};
export default function UserStatCard({ stat }: UserStatProps): JSX.Element {
  const createdAt = new Date(stat.createdAt);
  return (
    <Card
      className="accountpageText"
      sx={{mt: '200px', backgroundColor: 'black', opacity: '0.8', margin: "20px", width: 350, height: 120 }}
    >
      <CardContent>
        <Typography sx={{ fontSize: '20px', color: '#fff' }} component="div">
          {createdAt.toLocaleString('ru-RU')}
        </Typography>
        <Typography sx={{ fontSize: '20px', color: '#fff' }} component="div">
          Вино: {stat.Wine.title}
        </Typography>
        <Typography sx={{ fontSize: '20px', color: '#fff' }} component="div">
          Количество бокалов: {stat.count}
        </Typography>
      </CardContent>
    </Card>
  );
}
