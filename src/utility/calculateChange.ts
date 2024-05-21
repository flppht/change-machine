import { ChangeResultType } from "../components/ChangeMachine";

export const calculateChange = (
  amount: number,
  machineChange: ChangeResultType[]
) => {
  let remainingAmount = amount;
  let resultChange = new Array<ChangeResultType>();

  let machineChangeHelper = new Array<ChangeResultType>();
  for (let i = 0; i < machineChange.length; i++) {
    machineChangeHelper[i] = {
      denomination: machineChange[i].denomination,
      count: machineChange[i].count,
    };
  }
  machineChangeHelper.sort((a, b) => b.denomination - a.denomination);

  for (let i = 0; i < machineChangeHelper.length; i++) {
    let coindenomination = machineChangeHelper[i].denomination;
    let coinCount = machineChangeHelper[i].count;

    let neededCount = Math.floor(remainingAmount / coindenomination);

    // if needed count exceeds available count, set the max available count
    if (neededCount > coinCount) {
      neededCount = coinCount;
    }

    // if count exists for certain denomination, add denomination and its count to new array
    if (neededCount > 0) {
      resultChange.push({ denomination: coindenomination, count: neededCount });
      remainingAmount -= neededCount * coindenomination;
      // solving problem with floating point in javascript...
      remainingAmount = Math.round(remainingAmount * 10) / 10;
    }

    if (remainingAmount === 0) {
      break;
    }
  }

  // if there is no enough resources, return empty result
  if (remainingAmount > 0) {
    return [];
  }

  return resultChange;
};
