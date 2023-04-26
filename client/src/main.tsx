import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { store } from './features/redux/store';
import './scss/loginSignup.scss';
import './scss/newRecord.scss';
import './scss/createNewAdmin.scss';
import App from './App';

axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: 'Fira Sans Condensed, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
