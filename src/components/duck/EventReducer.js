import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push({ id: Date.now(), ...action.payload });
    },
    updateEvent: (state, action) => {
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        } else {
          return event;
        }
      });
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload.id
      );
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
