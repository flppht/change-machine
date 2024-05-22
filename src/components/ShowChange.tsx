import { useSelector } from "react-redux";
import { ChangeResultType } from "../types/ChangeResultType";
import { selectChangeInTotal } from "../store/slices/ChangeMachineSlice";
import SeparatingLine from "./SeparatingLine";

const ShowChange = ({ changeArray }: { changeArray: ChangeResultType[] }) => {
  const change = useSelector(selectChangeInTotal);

  return (
    <div>
      <SeparatingLine className={"w-64 my-3"} />
      <p className="text-center mb-1">
        Your change is: <span className="font-semibold">{change} BAM</span>
      </p>
      {changeArray.map((change, index) => (
        <div key={index}>
          <div className="grid grid-cols-2">
            <div className="text-right">{change.denomination} BAM:</div>
            <div className="font-semibold text-center">{change.count}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowChange;
