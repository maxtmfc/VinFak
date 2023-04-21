import React from 'react';
// import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
import AccountPage from './components/Pages/AccountPage';
import AdminPage from './components/Pages/AdminPage';
import BonusPage from './components/Pages/BonusPage';
import ContactsPage from './components/Pages/ContactsPage';
import LoginPage  from './components/Pages/LoginPage';
import MainPage from './components/Pages/MainPage';
import SignupPage from './components/Pages/SignupPage';
import Navbar from './components/UI/Navbar';

export default function App(): JSX.Element {
  return (
    <div>    
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bonus" element={<BonusPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}
