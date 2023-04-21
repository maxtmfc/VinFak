import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import axios from 'axios'
import App from './App';
import { store } from './features/redux/store';

axios.defaults.baseURL = 'http://localhost:3001/';
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
