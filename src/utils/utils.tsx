import { TInputStringArray } from '../components/string/string';

export const delay = (milliseconds: number) => new Promise(res => setTimeout(res, milliseconds))

export const swap = (
    arr: TInputStringArray[], 
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };