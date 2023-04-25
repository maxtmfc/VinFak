import { CircularProgress } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../features/redux/hooks';

type LoaderProps = {
  children: JSX.Element;
};

export default function Loader({ children }: LoaderProps): JSX.Element {
  const user = useAppSelector((store) => store.user);
  if (user.status !== 'fetching') return children;

  return <CircularProgress />;
}