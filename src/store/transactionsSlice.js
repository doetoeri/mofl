import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTransactions = createAsyncThunk('transactions/fetch', async (_, { getState }) => {
  const token = getState().auth.token;
  const res = await axios.get('/api/transactions', { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default transactionsSlice.reducer;
