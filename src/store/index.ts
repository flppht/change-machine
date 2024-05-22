import { configureStore } from "@reduxjs/toolkit";
import { changeMachineReducer } from "./slices/ChangeMachineSlice";

const store = configureStore({
  reducer: {
    changeMachine: changeMachineReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
