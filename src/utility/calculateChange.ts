import { ChangeResultType } from "../types/ChangeResultType";

export const calculateChange = (
  amount: number,
  machineChange: ChangeResultType[]
) => {
  // solving problem with floating point in javascript...
  let remainingAmount = Math.round(amount * 10) / 10;
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
    let coinDenomination = machineChangeHelper[i].denomination;
    let coinCount = machineChangeHelper[i].count;

    let neededCount = Math.floor(remainingAmount / coinDenomination);

    // if needed count exceeds available count, set the max available count
    if (neededCount > coinCount) {
      neededCount = coinCount;
    }

    // if count exists for certain denomination, add denomination and its count to new array
    if (neededCount > 0) {
      resultChange.push({ denomination: coinDenomination, count: neededCount });
      remainingAmount -= neededCount * coinDenomination;
      remainingAmount = Math.round(remainingAmount * 10) / 10;
    }

    if (remainingAmount === 0) {
      break;
    }
  }

  // if there is no enough resources, return whatever it has of change and set isInsufficient to true
  if (remainingAmount > 0) {
    return { resultChange, isInsufficient: true };
  }

  return { resultChange, isInsufficient: false };
};
