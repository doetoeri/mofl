import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText } from '@mui/material';
import { fetchTransactions } from '../store/transactionsSlice';

export default function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.items);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <List>
      {transactions.map((t) => (
        <ListItem key={t.id} divider>
          <ListItemText primary={`${t.description} - ${t.amount}`} secondary={t.date} />
        </ListItem>
      ))}
    </List>
  );
}
