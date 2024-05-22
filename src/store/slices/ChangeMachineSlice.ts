import { createSlice } from "@reduxjs/toolkit";
import { generateMachineInitialState } from "../../utility/machineStateHelper";
import { calculateChange } from "../../utility/calculateChange";
import { ChangeResultType } from "../../types/ChangeResultType";

const changeMachineSlice = createSlice({
  name: "changeMachine",
  initialState: {
    denominationsState: generateMachineInitialState(),
    amountToPay: 0,
    totalAmount: 0,
    returnedChange: [] as ChangeResultType[],
    isInsufficient: null as boolean,
    isChangeReturned: false,
  },
  reducers: {
    setChangeState(state, action) {
      for (let i = 0; i < state.denominationsState.length; i++) {
        if (
          state.denominationsState[i].denomination ===
          action.payload[i].denomination
        ) {
          state.denominationsState[i].count = action.payload[i].count;
        }
      }
    },
    setAmountToPay(state, action) {
      state.amountToPay = action.payload;
      state.totalAmount = 0;
      state.isInsufficient = null;
      state.returnedChange = [];
      state.isChangeReturned = false;
    },
    incrementDenominationCount(state, action) {
      state.denominationsState[action.payload.key].count++;
      state.totalAmount +=
        state.denominationsState[action.payload.key].denomination;
      state.totalAmount = Math.round(state.totalAmount * 10) / 10;
    },
    returnChange(state) {
      const { resultChange, isInsufficient } = calculateChange(
        state.totalAmount - state.amountToPay,
        state.denominationsState
      );

      state.returnedChange = resultChange;
      state.isInsufficient = isInsufficient;
      state.isChangeReturned = true;
      // decrementing machine state after change is returned
      state.returnedChange.forEach((coin) => {
        for (let i = 0; i < state.denominationsState.length; i++) {
          if (state.denominationsState[i].denomination === coin.denomination) {
            state.denominationsState[i].count -= coin.count;
          }
        }
      });
    },
  },
  selectors: {
    selectChangeMachine: (state) => state.denominationsState,
    selectIsEnoughAmount: (state) => state.totalAmount >= state.amountToPay,
    selectTotalAmount: (state) => state.totalAmount,
    selectAmountToPay: (state) => state.amountToPay,
    selectReturnedChange: (state) => state.returnedChange,
    selectIsInsufficient: (state) => state.isInsufficient,
    selectChangeInTotal: (state) =>
      Math.round((state.totalAmount - state.amountToPay) * 10) / 10,
    selectIsChangeReturned: (state) => state.isChangeReturned,
  },
});

export const {
  setChangeState,
  setAmountToPay,
  incrementDenominationCount,
  returnChange,
} = changeMachineSlice.actions;
export const changeMachineReducer = changeMachineSlice.reducer;
export const {
  selectChangeMachine,
  selectIsEnoughAmount,
  selectTotalAmount,
  selectAmountToPay,
  selectReturnedChange,
  selectIsInsufficient,
  selectChangeInTotal,
  selectIsChangeReturned,
} = changeMachineSlice.selectors;
