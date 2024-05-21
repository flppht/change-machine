import { ChangeResultType } from "./ChangeMachine";

const ShowChange = ({ changeArray }: { changeArray: ChangeResultType[] }) => {
  return (
    <div className="mt-2">
      {changeArray.map((change, index) => (
        <div key={index}>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-right">{change.denomination} BAM:</div>
            <div className="font-semibold text-center">{change.count}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowChange;
