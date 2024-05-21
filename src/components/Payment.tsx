import { useState } from "react";
import ChangeMachine from "./ChangeMachine";

const Payment = () => {
  const [amount, setAmount] = useState<number>(null);
  const generatePayment = () => {
    let randomNum = Math.random() * 100; // generate random number [0-100]
    let roundedNum = Math.round(randomNum * 10) / 10; // rounded decimals in order to return exact num of denominations, 4.56 -> 4.6

    setAmount(roundedNum);
  };

  const showAmount = (
    <div>
      <p className="text-l font-semibold mt-2">Amount: {amount}</p>
    </div>
  );

  return (
    <div className="paymentContainer items-center mt-10">
      <div className="flex flex-row items-center space-x-3">
        <p className="w-4/5">Generate random payment amount</p>
        <button
          type="button"
          onClick={generatePayment}
          className="bg-cyan-600 rounded-md px-2 py-1 text-white"
        >
          Generate
        </button>
      </div>

      {amount && showAmount}

      <hr className="paymentHr" />

      {amount > 0 && <ChangeMachine amount={amount} />}
    </div>
  );
};

export default Payment;
