import { useDispatch, useSelector } from "react-redux";
import {
  selectAmountToPay,
  setAmountToPay,
} from "../store/slices/ChangeMachineSlice";
import MachineState from "./MachineState";
import SeparatingLine from "./SeparatingLine";
import ChangeMachine from "./ChangeMachine";
import { CURRENCY } from "../globals";

const Payment = () => {
  const amountToPay = useSelector(selectAmountToPay);
  const dispatch = useDispatch();

  const generatePayment = () => {
    let randomNum = Math.random() * 20; // generate random number [0-20]
    let roundedNum = Math.round(randomNum * 10) / 10; // rounded decimals in order to return exact num of denominations, 4.56 -> 4.6

    dispatch(setAmountToPay(roundedNum));
  };

  const showAmount = (
    <div>
      <p className="text-l font-semibold mt-2">
        Amount to pay: {amountToPay} {CURRENCY}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col h-auto rounded-lg px-5 py-3 bg-zinc-100 w-1/3 min-w-96 items-center my-4 shadow-md">
      <MachineState />
      <div className="flex flex-row items-center space-x-3 mt-1">
        <p className="w-4/5">Generate random payment amount</p>
        <button
          type="button"
          onClick={generatePayment}
          className="bg-sky-500 rounded-md px-2 py-1 text-white hover:bg-sky-600"
        >
          Generate
        </button>
      </div>

      {amountToPay > 0 && showAmount}

      <SeparatingLine className={"my-4"} />

      {amountToPay > 0 && <ChangeMachine />}
    </div>
  );
};

export default Payment;
