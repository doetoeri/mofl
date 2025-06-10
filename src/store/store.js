import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionsReducer from './transactionsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
  },
});
