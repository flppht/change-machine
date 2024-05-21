import { configureStore } from "@reduxjs/toolkit";
import {
  changeMachineReducer,
  changeStateOfChange,
} from "./slices/ChangeMachineSlice";

const store = configureStore({
  reducer: {
    changeMachine: changeMachineReducer,
  },
});

export { changeStateOfChange };
export { store };
export type RootState = ReturnType<typeof store.getState>;
