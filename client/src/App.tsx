import React, { useEffect } from 'react';
// import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/HOC/PrivatRouter';
// import { Provider } from 'react-redux';
import AccountPage from './components/Pages/AccountPage';
import AdminPage from './components/Pages/AdminPage';
import BonusPage from './components/Pages/BonusPage';
import ContactsPage from './components/Pages/ContactsPage';
import LoginPage  from './components/Pages/LoginPage';
import MainPage from './components/Pages/MainPage';
import SignupPage from './components/Pages/SignupPage';
import Navbar from './components/UI/Navbar';
import Menu from './components/UI/Menu';
import StatForm from './components/UI/StatForm';
import AddAdminForm from './components/UI/AddAdminForm';
import { useAppDispatch, useAppSelector } from './features/redux/hooks';
import { checkUserThunk } from './features/redux/slices/user/thunkActions';

export default function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserThunk());
  }, []);

  return (
    <div>    
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bonus" element={<BonusPage />} />
        <Route element={<PrivateRoute isAllowed={user.status === 'guest'} />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute isAllowed={user.status === 'logged'}  redirectPath="/login" />}>
        <Route path="/user" element={<AccountPage />} />
        <Route path="/admin/menu" element={<Menu />} />
        </Route>
        <Route element={<PrivateRoute isAllowed={user.status === 'logged' && user.admin === true}  redirectPath="/login" />} >
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/newrecord" element={<StatForm />} />
        <Route path="/admin/newadmin" element={<AddAdminForm />} />
        </Route>
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}
