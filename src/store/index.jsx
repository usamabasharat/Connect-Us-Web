import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/userSlice';
import meetingReducer from './slices/meetingSlice';

const store = configureStore({
  reducer: {
    user: loginReducer,
    meetings: meetingReducer
  }
});

export default store;
