import IColumn from '../components/sorting-page/sorting-page';
import { TInputStringArray } from '../components/string/string';
import { ElementStates } from '../types/element-states';

export const delay = (milliseconds: number) => new Promise(res => setTimeout(res, milliseconds))

export const swap = (
    arr: TInputStringArray[] | IColumn[], 
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const calculateFibonacciSequence = (n: number, memo: Record<number, number> = {}): number => {
  if (n in memo) {
    return memo[n];
  }
  if (n <= 2) {
    return 1;
  }
  memo[n] = calculateFibonacciSequence(n - 1, memo) + calculateFibonacciSequence(n - 2, memo);
  return memo[n];
};

export const getRandomInRange = (min: number, max: number): IColumn => {
  return ({ 
    number: Math.floor(Math.random() * (max - min + 1) + min),
    state: ElementStates.Default
  })
}