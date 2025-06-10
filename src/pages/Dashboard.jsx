import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchTransactions } from '../store/transactionsSlice';

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const totalSpent = transactions.reduce((sum, t) => sum + (t.amount < 0 ? -t.amount : 0), 0);
  const totalIncome = transactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
  const balance = totalIncome - totalSpent;

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h5">{t('dashboard')}</Typography>
        <Typography>{t('totalSpent')}: {totalSpent}</Typography>
        <Typography>{t('totalIncome')}: {totalIncome}</Typography>
        <Typography>{t('balance')}: {balance}</Typography>
      </CardContent>
    </Card>
  );
}
