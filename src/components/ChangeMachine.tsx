import { useEffect, useState } from "react";
import { calculateChange } from "../utility/calculateChange";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import ShowChange from "./ShowChange";

export type ChangeResultType = { denomination: number; count: number };

const ChangeMachine = ({ amount }: { amount: number }) => {
  const [result, setResult] = useState<ChangeResultType[] | []>();
  const machineState = useSelector((state: RootState) => state.changeMachine);

  useEffect(() => {
    const resultChange = calculateChange(amount, machineState);
    setResult(resultChange);
  }, [amount]);

  const successMessage = (
    <p className="rounded-md bg-green-500 text-white p-2">
      Payment accepted. Here is your change:
    </p>
  );

  const failMessage = (
    <p className="rounded-md bg-red-500 text-white p-2">
      Payment declined due to insufficient resources.
    </p>
  );

  return (
    <div className="flex flex-col items-center">
      {result && result.length > 0 ? successMessage : failMessage}
      {result && result.length > 0 && <ShowChange changeArray={result} />}
    </div>
  );
};

export default ChangeMachine;
