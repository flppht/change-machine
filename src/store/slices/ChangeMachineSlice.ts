import { createSlice } from "@reduxjs/toolkit";

const changeMachineSlice = createSlice({
  name: "changeMachine",
  initialState: [
    { denomination: 5, count: 0 },
    { denomination: 2, count: 0 },
    { denomination: 1, count: 0 },
    { denomination: 0.5, count: 0 },
    { denomination: 0.2, count: 0 },
    { denomination: 0.1, count: 0 },
  ],
  reducers: {
    changeStateOfChange(state, action) {
      for (let i = 0; i < state.length; i++) {
        if (state[i].denomination === action.payload[i].denomination) {
          state[i].count = action.payload[i].count;
        }
      }
    },
  },
});

export const { changeStateOfChange } = changeMachineSlice.actions;
export const changeMachineReducer = changeMachineSlice.reducer;
