import { useDispatch, useSelector } from "react-redux";
import {
  incrementDenominationCount,
  returnChange,
  selectChangeMachine,
  selectIsChangeReturned,
  selectIsEnoughAmount,
  selectIsInsufficient,
  selectReturnedChange,
  selectTotalAmount,
} from "../store/slices/ChangeMachineSlice";
import ShowChange from "./ShowChange";
import { CURRENCY } from "../globals";

const ChangeMachine = () => {
  const machineState = useSelector(selectChangeMachine);
  const totalAmount = useSelector(selectTotalAmount);
  const isEnoughAmount = useSelector(selectIsEnoughAmount);
  const change = useSelector(selectReturnedChange);
  const isInsufficient = useSelector(selectIsInsufficient);
  const isChangeReturned = useSelector(selectIsChangeReturned);

  const dispatch = useDispatch();

  const failMessage = (
    <p className="rounded-md bg-red-500 text-white py-1 px-2 mt-2 text-center">
      Due to insufficient resources, change could not be return completely.
    </p>
  );

  const addCoin = (denomination: number, key: number) => {
    dispatch(incrementDenominationCount({ denomination, key }));
  };

  const onReturnChange = () => {
    dispatch(returnChange());
  };

  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold mb-2">
        Inserted amount: {totalAmount} {CURRENCY}
      </p>
      {!isEnoughAmount && (
        <>
          <p className="font-semibold mb-2">Insert coins:</p>
          <div className="grid grid-cols-3 gap-2">
            {machineState.map((machine, key) => (
              <div key={key}>
                <button
                  type="button"
                  onClick={() => addCoin(machine.denomination, key)}
                  className="bg-slate-300 rounded-md p-2 w-24 font-semibold hover:bg-slate-400"
                >
                  {machine.denomination} {CURRENCY}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {isEnoughAmount && !isChangeReturned && (
        <button
          type="button"
          onClick={onReturnChange}
          className="bg-green-300 rounded-md p-2 w-36 font-medium hover:bg-green-400"
        >
          Return change
        </button>
      )}

      {change && change.length > 0 && <ShowChange changeArray={change} />}
      {change.length === 0 && isChangeReturned && !isInsufficient && (
        <p className="italic text-red-600">Nothing to return</p>
      )}
      {isInsufficient && failMessage}
    </div>
  );
};

export default ChangeMachine;
