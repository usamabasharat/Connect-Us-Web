import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: loginReducer
  }
});

export default store;
