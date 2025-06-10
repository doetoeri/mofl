import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '@fontsource/noto-sans';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import Login from './pages/Login';
import theme from './theme';

export default function App() {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <nav>
          <Link to="/">{t('dashboard')}</Link> |{' '}
          <Link to="/transactions">{t('transactions')}</Link> |{' '}
          <Link to="/categories">{t('categories')}</Link> |{' '}
          <Link to="/settings">{t('settings')}</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
