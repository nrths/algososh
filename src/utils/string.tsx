import { ElementStates } from "../types/element-states";
import { TInputStringArray } from "../components/string/string";
import { delay, swap } from "./utils";
import { DELAY_IN_MS } from "../constants/delays";
import { Dispatch, SetStateAction } from "react";

export const reverseInputString = async (
  arr: TInputStringArray[],
  setArray: Dispatch<SetStateAction<TInputStringArray[]>>
) => {
  const center = arr.length / 2;
  let start = 0;
  let end = arr.length - 1;

  while (start < center) {
    if (arr[start].hasOwnProperty('state') && arr[end].hasOwnProperty('state')) {
      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setArray([...arr]);

      await delay(DELAY_IN_MS);

      arr[start].state = ElementStates.Modified;
      arr[end].state = ElementStates.Modified;
    }

    swap(arr, start, end);

    if (arr[start].hasOwnProperty('state') && arr[end].hasOwnProperty('state')) {
        setArray([...arr])
        await delay(DELAY_IN_MS)
    }

    start++;
    end--;
  }

  return arr
};
