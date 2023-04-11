import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meetings: []
};

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    allMeetings: (state, action) => {
      state.meetings = action.payload;
    }
  },
});

export const { allMeetings } = meetingsSlice.actions;
export default meetingsSlice.reducer;
