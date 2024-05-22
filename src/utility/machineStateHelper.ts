import { DENOMINATIONS } from "../globals";
import { ChangeResultType } from "../types/ChangeResultType";

export const generateMachineInitialState = (): ChangeResultType[] => {
  return DENOMINATIONS.map(
    (denomination) => ({ denomination, count: 0 } as ChangeResultType)
  );
};
