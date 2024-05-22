import { useSelector } from "react-redux";
import { selectChangeMachine } from "../store/slices/ChangeMachineSlice";
import SeparatingLine from "./SeparatingLine";
import { CURRENCY } from "../globals";

const MachineState = () => {
  const machineState = useSelector(selectChangeMachine);

  return (
    <div className="flex flex-col rounded-md bg-slate-300/90 p-2 w-64 mb-2 shadow-md">
      <p className="font-semibold text-l text-center">Current Machine State</p>
      <div className="grid grid-cols-2 gap-2 underline underline-offset-2 justify-items-center">
        <div>Denomination</div>
        <div>Count</div>
      </div>
      {machineState.map((machine, key) => (
        <>
          <div
            key={key}
            className="grid grid-cols-2 gap-2 justify-items-center"
          >
            <div>
              {machine.denomination} {CURRENCY}
            </div>
            <div className="font-semibold">{machine.count}</div>
          </div>
          <SeparatingLine className={"self-center w-11/12"} />
        </>
      ))}
    </div>
  );
};

export default MachineState;
